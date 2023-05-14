import { Router } from 'express'
import { getRandomWordHandler, getWordHandler } from '../handlers/wordHandlers'
import cors from 'cors'

export const router = Router()
router.use(cors())
router.get('/', getWordHandler)
router.get('/random', getRandomWordHandler)
