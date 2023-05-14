import { getRandomWord, getWord } from '../controllers/wordControllers'

export const getRandomWordHandler = async (req, res) => {
  try {
    const word = await getRandomWord()
    res.status(200).json(word)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const getWordHandler = async (req, res) => {
  const { word } = req.query

  try {
    const wordDef = await getWord(word)
    res.status(200).json(wordDef)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

