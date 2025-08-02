import { Router } from 'express'
import { login } from '../controllers/auth.controller'
import { verifyToken } from '../middlewares/auth.middleware'

const router = Router()
router.post('/login', login)

router.get('/me', verifyToken, (req, res) => {
  const user = (req as any).user
  res.json({ user })
})

export default router
