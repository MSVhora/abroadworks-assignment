import schedule = require('node-schedule')
import { logger } from '../utils/logger'
import { v4 } from 'uuid'
import { HddHelper } from '../components/system-summary/helper'

/**
 * @description schedule cron for clearing previous orders
 */
const init = (): void => {
   const uuid = v4()
   try {
      logger.info(__filename, 'initHddSummaryCronJob', uuid, 'Insert HDD Summary to MongoDb in 1hour interval')
      const rule = new schedule.RecurrenceRule()
      rule.minute = 1

      schedule.scheduleJob(rule, async () => {
         await updateHddSummaryInDB(uuid)
      })
   } catch (e) {
      logger.error(__filename, 'initHddSummaryCronJob', uuid, 'error during init cron', e)
      throw e
   }
}

const updateHddSummaryInDB = async (uuid: string) => {
   try {
      await HddHelper.updateAndFetchHddSummary()
      logger.info(__filename, 'updateHddSummaryInDB', uuid, 'HddSummary updated in DB')
   } catch (e) {
      logger.error(__filename, 'updateHddSummaryInDB', uuid, 'error during updateHddSummaryInDB cron', e)
   }
}

export default init
