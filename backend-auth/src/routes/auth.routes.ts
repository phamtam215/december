import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller'
import { validateDto } from '../middlewares/validate'
import { SignupDto } from '../dtos/signup.dto'
import { verifyToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/signup', validateDto(SignupDto), signup)

router.get('/me', verifyToken, (req, res) => {
  const user = (req as any).user
  res.json({ user })
})

export default router
