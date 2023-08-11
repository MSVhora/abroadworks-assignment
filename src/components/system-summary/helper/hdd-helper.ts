import * as Systeminformation from 'systeminformation'
import { convertBytesToMB } from '../../../utils/helper'

class HDDHelper {
    public async getHDDSummary() {
        const hddDisks: any[] = await Systeminformation.diskLayout()
        const hddDrives: any[] = await Systeminformation.blockDevices()
        const driveDetails = await Systeminformation.fsSize()

        for (const drive of hddDrives) {
            const driveDetail = driveDetails.find(d => d.fs == drive.name)
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

        for (const disk of hddDisks) {
            disk.totalSizeInMB = convertBytesToMB(disk.size)
            disk.usedSizeInMB = 0
            disk.availableSizeInMB = 0
            disk.unallocatedSizeInMB = 0
            disk.drives = hddDrives.filter(drive =>
                drive.device == disk.device
            )

            for (const drive of disk.drives) {
                disk.usedSizeInMB += drive.usedSizeInMB
                disk.availableSizeInMB += drive.availableSizeInMB
            }
            disk.unallocatedSizeInMB = disk.totalSizeInMB - disk.usedSizeInMB - disk.availableSizeInMB
        }
        return hddDisks
    }
}

const hddHelper = new HDDHelper()
export default hddHelper