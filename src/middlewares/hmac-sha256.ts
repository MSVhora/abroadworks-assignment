import { createHmac } from 'crypto';
import { Request, NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { HMAC_SECRET_KEY_DIVIDER } from '../utils/constants';
import { createResponse } from '../utils/helper';
import { logger } from '../utils/logger';
import { isEmpty } from '../utils/validator';

class HMAC_SHA256 {
   /**
    * @description Hmac Sha-256 for Wallet APIs
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isUserHMACValid(req: Request, res: any, next: NextFunction) {
      try {
         const xTimeStamp = req.headers['x-timestamp'];
         const xSignature = req.headers['x-signature'];
         const key = req.user.key;
         const userUUID = req.user.uuid;

         if (isEmpty(xTimeStamp)) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Invalid timestamp.');
         }
         const secretKey = userUUID + HMAC_SECRET_KEY_DIVIDER + key + HMAC_SECRET_KEY_DIVIDER + xTimeStamp;
         const bodyData = JSON.stringify(req.body);

         const signature = createHmac('sha256', secretKey)
            .update(bodyData)
            .digest('hex');
         console.log(secretKey);
         if (signature.toString() !== xSignature?.toString()) {
            return createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('INVALID_DATA'));
         }
         return next();
      } catch (e) {
         logger.error(__filename, 'isUserHMACValid', '', 'isUserHMACValid function', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }
}

const hmacSha256 = new HMAC_SHA256();
export default hmacSha256;
