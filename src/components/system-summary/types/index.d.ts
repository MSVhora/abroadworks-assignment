declare namespace SystemSummary {
    export interface Disk {
        device: string;
        type: string;
        name: string;
        vendor: string;
        size: number;
        bytesPerSector: number;
        totalCylinders: number;
        totalHeads: number;
        totalSectors: number;
        totalTracks: number;
        tracksPerCylinder: number;
        sectorsPerTrack: number;
        firmwareRevision: string;
        serialNum: string;
        interfaceType: string;
        smartStatus: string;
        temperature: null | number;
        totalSizeInMB?: number;
        usedSizeInMB?: number;
        availableSizeInMB?: number;
        unallocatedSizeInMB?: number;
        usedSizePercentage?: number;
        availableSizePercentage?: number;
        unallocatedSizePercentage?: number;
        drives?: Drive[]
    }

    export interface Drive {
        name: string;
        identifier: string;
        type: string;
        fsType: string;
        mount: string;
        size: number;
        physical: string;
        uuid: string;
        label: string;
        model: string;
        serial: string;
        removable: boolean;
        protocol: string;
        group?: string;
        device?: string;
        totalSizeInMB?: number;
        usedSizeInMB?: number;
        availableSizeInMB?: number;
        usedSizePercentage?: number;
        availableSizePercentage?: number;
    }

    export interface DriveDetail {
        fs: string;
        type: string;
        size: number;
        used: number;
        available: number;
        use: number;
        mount: string;
        rw: boolean | null;
    }
}
export = SystemSummary;