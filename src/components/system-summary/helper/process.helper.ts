import * as Systeminformation from 'systeminformation'

class ProcessHelper {
   public async getProcessSummary() {
      return await Systeminformation.processes()
   }
}

const processHelper = new ProcessHelper()
export default processHelper
