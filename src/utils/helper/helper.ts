import jwt from 'jsonwebtoken'
import { logger } from '../logger'
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS_CODE from 'http-status-codes'

/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const createResponse = (
   res: Response,
   status: number,
   message: string,
   payload: object = {},
   pager?: object,
) => {
   pager = pager !== undefined ? pager : {}
   return res.status(Number(status)).json({
      status,
      message,
      payload,
      pager: pager,
   })
}

/**
 * @description Send Validation Response
 * @param {errors} errors - Errors Object
 * @param {Object} res
 */
export const createValidationResponse = async (res: Response, errors: any) => {
   // logger.error(__filename, 'validations', '', 'validation errors', errors);
   return createResponse(res, HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY, errors[Object.keys(errors)[0]], {
      error: errors,
   })
}

/**
 * decode JWT token
 * @param JWT token
 */
export const decodedJWTToken = (token: string) => {
   try {
      const tokenString = token.split(' ')[1] === undefined ? token : token.split(' ')[1]
      return jwt.decode(tokenString)
   } catch (err) {
      return false
   }
}

/**
 * create JWT token
 * @param JWT token
 */
export const createJWTToken = (data: any) => {
   try {
      return jwt.sign(data, process.env.JWT_KEY || 'staticSecret')
   } catch (err) {
      throw err
   }
}

/**
 * verify JWT token
 * @param JWT token
 */
export const verifyJWTToken = (token: any) => {
   try {
      return jwt.verify(token, process.env.JWT_KEY || 'staticSecret')
   } catch (err) {
      throw err
   }
}

/**
 * It will validate JWT token from req
 * @param {req object}
 */
export const validateJWTToken = (req: Request, res: Response, next: NextFunction) => {
   try {
      // find user Id from JWT Token
      const authorization = req.headers && req.headers.authorization ? req.headers.authorization : ''
      const JWTData = decodedJWTToken(authorization)
      if (JWTData) {
         next()
      } else {
         logger.error(__filename, 'validateJWTToken', 'UUID N/A', req.__('INVALID_ACCESS_TOKEN'))
         createResponse(res, HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY, req.__('INVALID_ACCESS_TOKEN'))
         return
      }
   } catch (error) {
      logger.error(__filename, 'validateJWTToken', 'UUID N/A', req.__('JWT_DECODE_ERROR'), error)
      createResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'))
      return
   }
}

export const convertBytesToKB = (bytes: number): number => {
   return Math.round(bytes / 1024)
}

export const convertBytesToMB = (bytes: number): number => {
   return Math.round(bytes / 1024 / 1024)
}

export const convertBytesToGB = (bytes: number): number => {
   return Math.round(bytes / 1024 / 1024 / 1024)
}

export const roundNumber = (value: number, decimals: number): number => {
   return parseFloat(value.toFixed(decimals))
}
