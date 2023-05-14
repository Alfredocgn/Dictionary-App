import { getRandomWord, getWord } from '../controllers/wordControllers'

export const getRandomWordHandler = async (req, res) => {
  try {
    const word = await getRandomWord()
    console.log(word)
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
    if (error.response?.status === 404) {
      res.json({ error: `Word ${word}not found` })
    }
    console.error(error)
    return {
      error: 'Word not found',
      status: 500
    }
  }
}

