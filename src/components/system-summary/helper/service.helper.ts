import * as Systeminformation from 'systeminformation'

class ServiceHelper {
   public async getServiceSummary() {
      return await Systeminformation.services('*')
   }
}

const serviceHelper = new ServiceHelper()
export default serviceHelper
