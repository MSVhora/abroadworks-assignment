import * as Systeminformation from 'systeminformation'
import { convertBytesToMB, roundNumber } from '../../../utils/helper'
import { Disk, Drive, DriveDetail } from '../types'

class HDDHelper {
    public async getHDDSummary() {
        const hddDisks: Disk[] = await Systeminformation.diskLayout()
        const hddDrives: Drive[] = await Systeminformation.blockDevices()
        const driveDetails: DriveDetail[] = await Systeminformation.fsSize()

        for (const drive of hddDrives) {
            const driveDetail = driveDetails.find(d => d.fs == drive.name)
            this.calculateDriveSizeInMB(drive, driveDetail)
            this.calculateDriveSizePercentageValues(drive)
        }

        for (const disk of hddDisks) {
            disk.drives = hddDrives.filter(drive =>
                drive.device == disk.device
            ) ?? []

            this.calculateDiskSizeInMB(disk)
            this.calculateDiskSizePercentageValues(disk)

        }
        return hddDisks
    }

    /**
     * Method for calculating size of drive using drive details
     * @param drive
     * @param driveDetail 
     */
    private calculateDriveSizeInMB(drive: Drive, driveDetail?: DriveDetail) {
        if (driveDetail != null) {
            drive.totalSizeInMB = convertBytesToMB(driveDetail.size)
            drive.usedSizeInMB = convertBytesToMB(driveDetail.used)
            drive.availableSizeInMB = convertBytesToMB(driveDetail.available)
        } else {
            drive.totalSizeInMB = 0
            drive.usedSizeInMB = 0
            drive.availableSizeInMB = 0
        }
    }


    /**
     * Method for calculating size percentage values of drive
     * @param drive 
     */
    private calculateDriveSizePercentageValues(drive: Drive) {
        if (drive.totalSizeInMB == 0) {
            drive.availableSizePercentage = 0
            drive.usedSizePercentage = 0
        } else {
            drive.availableSizePercentage = roundNumber(drive.availableSizeInMB! / drive.totalSizeInMB! * 100, 2)
            drive.usedSizePercentage = roundNumber(drive.usedSizeInMB! / drive.totalSizeInMB! * 100, 2)
        }
    }

    /**
     * Method for calculating size of disk
     * @param drive
     * @param driveDetail 
     */
    private calculateDiskSizeInMB(disk: Disk) {
        disk.totalSizeInMB = convertBytesToMB(disk.size)
        disk.usedSizeInMB = 0
        disk.availableSizeInMB = 0
        disk.unallocatedSizeInMB = 0

        for (const drive of disk.drives!) {
            disk.usedSizeInMB += drive.usedSizeInMB!
            disk.availableSizeInMB += drive.availableSizeInMB!
        }
        disk.unallocatedSizeInMB = disk.totalSizeInMB - disk.usedSizeInMB - disk.availableSizeInMB
    }


    /**
     * Method for calculating size percentage values of disk
     * @param drive 
     */
    private calculateDiskSizePercentageValues(disk: Disk) {
        if (disk.totalSizeInMB == 0) {
            disk.availableSizePercentage = 0
            disk.usedSizePercentage = 0
            disk.unallocatedSizePercentage = 0
        } else {
            disk.availableSizePercentage = roundNumber(disk.availableSizeInMB! / disk.totalSizeInMB! * 100, 2)
            disk.usedSizePercentage = roundNumber(disk.usedSizeInMB! / disk.totalSizeInMB! * 100, 2)
            disk.unallocatedSizePercentage = roundNumber(disk.unallocatedSizeInMB! / disk.totalSizeInMB! * 100, 2)
        }
    }
}

const hddHelper = new HDDHelper()
export default hddHelper