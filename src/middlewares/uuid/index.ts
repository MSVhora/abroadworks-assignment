import express, { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';

export default (app: express.Application) => {
   app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.custom && req.custom.uuid) {
         return next();
      }
      let uuidObj = {
         uuid: uuid.v4()
      };
      req.custom = uuidObj;
      next();
   });
};
