import axios from 'axios'


export const getRandomWord = async () => {
  const randomWord = (await axios.get('https://developer.wordnik.com/docs#!/words/getRandomWord')).data
}


export const getWord = async (word:string) => {
  const wordDef = (await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)).data
  const wordResult = [{ word: wordDef[0].word, def: wordDef[0].meanings[0].definitions[0].definition }]
  return wordResult
}
