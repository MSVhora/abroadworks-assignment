import { NextFunction, Request, Response } from 'express';
import { isBoolean, isEmpty } from '../../../utils/validator';
import { createValidationResponse } from '../../../utils/helper';

class SystemSummaryValidator {
   /**
    * @description
    * @param req
    * @param res
    * @param next
    */
   public static systemSummary(req: Request, res: Response, next: NextFunction) {
      const { showHDDSummary, showMemorySummary, showProcessSummary, showProcessList } = req.query;
      const errors: any = {};

      if (!isEmpty(showHDDSummary) && !isBoolean(showHDDSummary)) {
         errors.showHDDSummary = req.__('SYSTEM_SUMMARY.VALIDATIONS.showHDDSummary.mustBoolean');
      }

      if (!isEmpty(showMemorySummary) && !isBoolean(showMemorySummary)) {
         errors.showMemorySummary = req.__('SYSTEM_SUMMARY.VALIDATIONS.showMemorySummary.mustBoolean');
      }

      if (!isEmpty(showProcessSummary) && !isBoolean(showProcessSummary)) {
         errors.showProcessSummary = req.__('SYSTEM_SUMMARY.VALIDATIONS.showProcessSummary.mustBoolean');
      }

      if (!isEmpty(showProcessList) && !isBoolean(showProcessList)) {
         errors.showProcessList = req.__('SYSTEM_SUMMARY.VALIDATIONS.showProcessList.mustBoolean');
      }

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }
}

export default SystemSummaryValidator;
