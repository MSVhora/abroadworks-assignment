import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const DriveSchema = new Schema({
   name: String,
   identifier: String,
   type: String,
   fsType: String,
   mount: String,
   size: Number,
   physical: String,
   uuid: String,
   label: String,
   model: String,
   serial: String,
   removable: Boolean,
   protocol: String,
   group: String,
   device: String,
   totalSizeInMB: Number,
   usedSizeInMB: Number,
   availableSizeInMB: Number,
   usedSizePercentage: Number,
   availableSizePercentage: Number,
})

const DiskSchema = new Schema({
   device: String,
   type: String,
   name: String,
   vendor: String,
   size: Number,
   bytesPerSector: Number,
   totalCylinders: Number,
   totalHeads: Number,
   totalSectors: Number,
   totalTracks: Number,
   tracksPerCylinder: Number,
   sectorsPerTrack: Number,
   firmwareRevision: String,
   serialNum: String,
   interfaceType: String,
   smartStatus: String,
   temperature: Number,
   totalSizeInMB: Number,
   usedSizeInMB: Number,
   availableSizeInMB: Number,
   unallocatedSizeInMB: Number,
   usedSizePercentage: Number,
   availableSizePercentage: Number,
   unallocatedSizePercentage: Number,
   drives: [DriveSchema],
})

const HddSummarySchema = new Schema({
   disks: {
      type: [DiskSchema],
   },
   createdAt: Date,
   expireAt: Date,
})

HddSummarySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const hddSummaryModel = mongoose.model('HddSummary', HddSummarySchema)
export default hddSummaryModel
