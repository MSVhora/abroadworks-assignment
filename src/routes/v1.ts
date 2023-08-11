import { Application } from 'express'
import { ROUTE_PREFIX_V1 } from '../utils/constants'
import systemSummaryRoutes from '../components/system-summary/v1'

/**
 * Init All routes here
 */
export default (app: Application) => {
   app.use(`${ROUTE_PREFIX_V1}/system-summary`, systemSummaryRoutes)
}
