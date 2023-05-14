import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const { API_KEY } = process.env

export const getRandomWord = async () => {
  const randomWord = (await axios.get(`http://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}`)).data
  const result = randomWord
  console.log(result)
  return result
}


export const getWord = async (word:string) => {
  const wordDef = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${API_KEY}`)).data
  const definition = wordDef.map(obj => obj.text)
  const wordAudio = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`)).data
  const audio = wordAudio.map(obj => obj.fileUrl)
  const wordExample = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/examples?includeDuplicates=false&useCanonical=false&limit=5&api_key=${API_KEY}`)).data
  const example = (wordExample.examples).map(obj => obj.text)
  const wordPronunciation = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/pronunciations?useCanonical=false&limit=50&api_key=${API_KEY}`)).data
  const prounciation = wordPronunciation.map(obj => obj.raw)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const result = wordDef.map((el: any) => {
  //   return {
  //     word: el.word,
  //     def: el.meanings[0].definitions[0].definition,
  //     phonetic: el.phonetics[0]?.text,
  //     synonyms: el.meanings[0].definitions[0].synonyms?.map((synonym:string) => synonym),
  //     antonyms: el.meanings[0].definitions[0].antonyms?.map((antonym:string) => antonym),
  //     partOfSpeech: el.meanings[0].partOfSpeech,
  //     source: el.sourceUrls[0],
  //     audio: el.phonetics[0]?.audio
  //   }
  // })
  // console.log(definition)
  return { word, definition, audio, example, prounciation }
}
