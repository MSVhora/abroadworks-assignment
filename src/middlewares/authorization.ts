import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { createResponse, verifyJWTToken } from '../utils/helper';
import { logger } from '../utils/logger';
import { UserType } from '../components/user/types';
import { UserModel } from '../components/user/model';
import { VendorType } from '../components/vendor/types';
import { VendorModel } from '../components/vendor/model';

class Authorization {
   /**
    * @description Route Authorization for User
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isUserAuthorized(req: any, res: any, next: NextFunction) {
      try {
         const { authorization } = req.headers;
         if (!authorization) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Authorization Token is required.');
         }

         try {
            const tokens = authorization.toString().split(' ');
            const decoded: any = verifyJWTToken(tokens[1]);
            const response: UserType | null = await UserModel.getSingle({ uuid: decoded.uuid }, [], {}, 'withKey');
            if (!response) {
               return createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
            } else {
               req.user = response;
               return next();
            }
         } catch (error) {
            return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('INVALID_ACCESS_TOKEN'));
         }
      } catch (e) {
         logger.error(__filename, 'isUserAuthorized', '', 'status Check error', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }

   /**
    * @description Route Authorization for Vendor
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isVendorAuthorized(req: any, res: any, next: NextFunction) {
      try {
         const xAccessKey = req.headers['x-access-key'];
         if (!xAccessKey) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Access key is required.');
         }

         try {
            const response: VendorType | null = await VendorModel.getSingle({ uuid: xAccessKey }, [], {});
            if (!response) {
               return createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
            } else {
               req.vendor = response;
               return next();
            }
         } catch (error) {
            return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('INVALID_ACCESS_TOKEN'));
         }
      } catch (e) {
         logger.error(__filename, 'isVendorAuthorized', '', 'status Check error', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }
}

const authorization = new Authorization();
export default authorization;
