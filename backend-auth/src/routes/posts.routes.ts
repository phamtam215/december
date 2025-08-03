import { Router } from 'express'
import { verifyToken, AuthRequest } from '../middlewares/auth.middleware'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { Post } from '../entities/Post'

const router = Router()

// 🟢 Public route - Không cần authentication
router.get('/posts', async (req, res) => {
  const posts = await AppDataSource.getRepository(Post).find({
    relations: ['author']
  })
  res.json(posts)
})

// 🔒 Private route - Cần authentication
router.post('/posts', verifyToken, async (req: AuthRequest, res) => {
  const { title, content } = req.body
  const userRepo = AppDataSource.getRepository(User)
  const postRepo = AppDataSource.getRepository(Post)

  const user = await userRepo.findOneBy({ id: req.user.id })
  if (!user) return res.status(401).json({ message: 'User not found' })

  const post = postRepo.create({ title, content, author: user })
  await postRepo.save(post)

  res.status(201).json(post)
})

router.put('/posts/:id', verifyToken, async (req: AuthRequest, res) => {
  const postRepo = AppDataSource.getRepository(Post)
  const post = await postRepo.findOne({
    where: { id: Number(req.params.id) },
    relations: ['author']
  })

  if (!post) return res.status(404).json({ message: 'Post not found' })
  if (post.author.id !== req.user.id)
    return res.status(403).json({ message: 'Not your post' })

  post.title = req.body.title ?? post.title
  post.content = req.body.content ?? post.content
  await postRepo.save(post)

  res.json(post)
})

export default router
