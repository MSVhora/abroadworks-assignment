import { Request, Response, Router } from 'express'
import validator from './validator'
import controller from './controller'

const router = Router()

/**
 * System Summary API
 * @route GET /v1/system-summary
 * @group GET - API for getting System Summary
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.get('/', validator.systemSummary, (req: Request, res: Response) => {
   controller.systemSummary(req, res)
})

export default router
