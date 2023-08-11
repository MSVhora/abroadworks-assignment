import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { createResponse } from '../utils/helper';
import { logger } from '../utils/logger';
import { isEmpty } from '../utils/validator';
import { TIMESTAMP_SYNC_MAX_DIFFERENCE } from '../utils/constants';

class TimestampSync {
   /**
    * @description Timestamp Authorization for User
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isTimestampInSync(req: any, res: any, next: NextFunction) {
      try {
         const xTimeStamp = req.headers['x-timestamp'];
         if (isEmpty(xTimeStamp)) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Invalid timestamp.');
         }

         try {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const timeStampDifference = currentTimestamp - parseInt(xTimeStamp);
            if (timeStampDifference > TIMESTAMP_SYNC_MAX_DIFFERENCE) {
               return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('TIMESTAMP_NOT_IN_SYNC'));
            }
            return next();
         } catch (error) {
            return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('TIMESTAMP_NOT_IN_SYNC'));
         }
      } catch (e) {
         logger.error(__filename, 'isTimestampInSync', '', 'isTimestampInSync function error', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }
}

const timestampSync = new TimestampSync();
export default timestampSync;
