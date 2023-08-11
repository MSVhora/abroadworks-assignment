import { Request, Response } from 'express';
import { createResponse } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import HTTP_STATUS_CODES from 'http-status-codes';
import HDDHelper from '../helper/hdd-helper'

class SystemSummaryController {
   /**
    * @description
    * @param req
    * @param res
    */
   public static async systemSummary(req: Request, res: Response) {
      // showMemorySummary, showProcessSummary, showProcessList
      const { showHDDSummary, } = req.query;
      try {
         const response: any = {}
         if (showHDDSummary) {
            response.hddSummary = await HDDHelper.getHDDSummary()
         }

         createResponse(res, HTTP_STATUS_CODES.OK, req.__('SYSTEM_SUMMARY.SUCCESS'), response);
      } catch (e) {
         logger.error(__filename, 'systemSummary', req.custom.uuid, `systemSummary function error`, e);
         createResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
      }
   }
}

export default SystemSummaryController;
