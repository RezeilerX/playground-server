import { getBlock, getBlocks } from 'controllers/blocks'
import { Router } from 'express'

const router = Router()

router.get('/', getBlocks)
router.get('/:slug', getBlock)

export default router
