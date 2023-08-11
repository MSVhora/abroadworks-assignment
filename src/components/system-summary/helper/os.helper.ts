import * as Systeminformation from 'systeminformation'

class OSHelper {
   public async getOSSummary() {
      return await Systeminformation.osInfo()
   }
}

const osHelper = new OSHelper()
export default osHelper
