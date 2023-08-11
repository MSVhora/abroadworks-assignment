import * as Systeminformation from 'systeminformation'
import { MemoryData } from '../types'
import { convertBytesToMB, roundNumber } from '../../../utils/helper'

class MemoryHelper {
   public async getMemorySummary(): Promise<MemoryData> {
      const memorySummary: MemoryData = await Systeminformation.mem()

      memorySummary.totalMemoryInMB = convertBytesToMB(memorySummary.total)
      memorySummary.freeMemoryInMB = convertBytesToMB(memorySummary.free)
      memorySummary.usedMemoryInMB = convertBytesToMB(memorySummary.used)

      if (memorySummary.totalMemoryInMB == 0) {
         memorySummary.freeMemoryPercentage = 0
         memorySummary.usedMemoryPercentage = 0
      } else {
         memorySummary.freeMemoryPercentage = roundNumber(
            (memorySummary.freeMemoryInMB / memorySummary.totalMemoryInMB) * 100,
            2,
         )
         memorySummary.usedMemoryPercentage = roundNumber(
            (memorySummary.usedMemoryInMB / memorySummary.totalMemoryInMB) * 100,
            2,
         )
      }

      return memorySummary
   }
}

const memoryHelper = new MemoryHelper()
export default memoryHelper
