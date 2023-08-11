import { Request, Response } from 'express'
import { createResponse } from '../../../utils/helper'
import { logger } from '../../../utils/logger'
import HTTP_STATUS_CODES from 'http-status-codes'
import { HddSummaryModel } from '../model'
import { MemoryHelper, OSHelper, ProcessHelper, ServiceHelper } from '../helper'

class SystemSummaryController {
   /**
    * @description
    * @param req
    * @param res
    */
   public static async systemSummary(req: Request, res: Response) {
      const { showOSSummary, showHDDSummary, showMemorySummary, showProcessSummary, showServiceSummary } = req.query
      try {
         const response: any = {}

         // Check for OS Info
         if (showOSSummary?.toString().toLowerCase() == 'true') {
            response.osSummary = await OSHelper.getOSSummary()
         }

         // Check for Hdd Summary
         if (showHDDSummary?.toString().toLowerCase() == 'true') {
            response.hddSummary = await HddSummaryModel.getLatest()
         }

         // Check for Memory Summary
         if (showMemorySummary?.toString().toLowerCase() == 'true') {
            response.memorySummary = await MemoryHelper.getMemorySummary()
         }

         // Check for Current Running Processes
         if (showProcessSummary?.toString().toLowerCase() == 'true') {
            response.processSummary = await ProcessHelper.getProcessSummary()
         }

         // Check for Current Running Services
         if (showServiceSummary?.toString().toLowerCase() == 'true') {
            response.serviceSummary = await ServiceHelper.getServiceSummary()
         }

         createResponse(res, HTTP_STATUS_CODES.OK, req.__('SYSTEM_SUMMARY.SUCCESS'), response)
      } catch (e) {
         logger.error(__filename, 'systemSummary', req.custom.uuid, `systemSummary function error`, e)
         createResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'))
      }
   }
}

export default SystemSummaryController
