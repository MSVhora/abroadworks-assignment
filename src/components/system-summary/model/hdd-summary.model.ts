import { getUTCExpiryTime, getUTCTime } from '../../../utils/time'
import { HddSummary } from '../schema'
import { Disk } from '../types'
class HddSummaryModel {
   /**
    * @description Method for inserting Hdd Summary
    * @param disks
    */
   async addOne(disks: Disk[]): Promise<void> {
      try {
         await HddSummary.create({
            disks: disks,
            createdAt: getUTCTime(),
            expireAt: getUTCExpiryTime(),
         })
      } catch (error) {
         throw error
      }
   }

   /**
    * @description Method for getting latest Hdd Summary
    */
   async getLatest(): Promise<Document | null | undefined> {
      try {
         return await HddSummary.findOne(
            {},
            { _id: false, __v: false, 'disks._id': false, 'disks.drives._id': false },
            { sort: { createdAt: -1 } },
         ).lean()
      } catch (e) {
         throw e
      }
   }
}

const hddSummaryModel = new HddSummaryModel()
export default hddSummaryModel
