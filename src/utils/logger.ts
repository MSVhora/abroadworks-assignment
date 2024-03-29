import fs from 'fs'
import moment from 'moment'
import { Logger, createLogger, transports, format } from 'winston'
const { label: setLabel } = format

class Logging {
   public logger: Logger

   // define the logs level
   private logLevel: string = 'silly'

   constructor() {
      this.logger = createLogger({
         transports: this.transportList(),
         exceptionHandlers: this.transportList(),
      })
   }
   // public methods for external use
   public error(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.error(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public warn(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.warn(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public info(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.info(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public verbose(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.verbose(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public debug(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.debug(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public silly(fileName: string, method: string, uuid: string, msg: string, data?: any) {
      this.setLabel(fileName, method)
      this.logger.silly(uuid + ' - ' + msg, data ? data : '', '\n')
   }

   public setFileLevel(level: string) {
      this.logger.transports[1].level = level
   }

   public setConsoleLevel(level: string) {
      this.logger.transports[0].level = level
   }

   public setLabel(fileName: string, method: string | null = null) {
      let label = this.getLabel(fileName)
      label += method ? ' ~ ' + method : ''
      this.logger.transports[0].format = setLabel({ label: label })
      this.logger.transports[1].format = setLabel({ label: label })
   }

   // return the file name from absolute path for label in logs
   private getLabel = (fileName: string) => {
      const parts = fileName.split('/')
      return parts[parts.length - 2] + '/' + parts.pop()
   }

   // return the file path for log file
   private filePath = () => {
      const dir = __dirname + '/../../logs'
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir)
      }
      return dir + `/logs_${moment.utc().format('YYYY-MM-DD')}_.log`
   }

   // set file transport object
   private fileOption = () => {
      return {
         level: this.logLevel,
         filename: this.filePath(),
         maxsize: 16777216, // Maximum size of a log file should be 16MB
         maxFiles: 64, // Maximum 64 file of 16 MB to be stored. i.e Max 1GB of logs can be stored
         handleExceptions: true,
         label: null, // Display file name
         json: false, // write error in json object or plain text
         timestamp: true,
         depth: '',
         colorize: false,
         silent: true, // comment to turn on logging
      }
   }

   // set console transport object
   private consoleOption = () => {
      return {
         level: this.logLevel,
         handleExceptions: true,
         label: null, // Display file name
         json: false, // write error in json object or plain text
         timestamp: true,
         depth: false,
         colorize: true, // for colorrized error (i.e red for erroro, green for info)
         // silent: true // Uncomment to turn off logging
      }
   }

   // create transport array
   private transportList = () => {
      return [new transports.Console(this.consoleOption()), new transports.File(this.fileOption())]
   }
}

export const logger = new Logging()
