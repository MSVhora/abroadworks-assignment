import { createServer } from 'http'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env') })

import app from './app'
import { logger } from './utils/logger'
import mongooseDb from './utils/dbconfig/db.config'

const server = createServer(app)
const port: number = Number(process.env.PORT) || 3000

// first connect database then
;(async () => {
   try {
      await mongooseDb.connect()

      server.listen(port, () => {
         logger.info(__filename, '', '', `Server is running on ${port}`, ``)
      })

      // Cron job functions
   } catch (e) {
      logger.error(__filename, '', '', `Unable to connect to the server`, e)
      process.exit(1)
   }
})()
