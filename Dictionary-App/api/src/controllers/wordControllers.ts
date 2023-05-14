import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const { API_KEY } = process.env

export const getRandomWord = async () => {
  const randomWord = (await axios.get(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`)).data
  const result = randomWord
  console.log(result)
  return result
}


export const getWord = async (word:string) => {
  const wordDef = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${API_KEY}`)).data
  const rawDefinition = wordDef.map(obj => obj.text)
  const sliceDefinition = rawDefinition.slice(0, 2)
  const definition = sliceDefinition.filter((definition) => definition !== undefined)
  const wordAudio = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`)).data
  const audio = wordAudio.map(obj => obj.fileUrl)
  const wordExample = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/examples?includeDuplicates=false&useCanonical=false&limit=5&api_key=${API_KEY}`)).data
  const rawExample = (wordExample.examples).map(obj => obj.text)
  const sliceExample = rawExample.slice(0, 2)
  const example = sliceExample.filter((example, index, self) => {
    return self.indexOf(example) === index
  })
  const wordPronunciation = (await axios.get(`https://api.wordnik.com/v4/word.json/${word}/pronunciations?useCanonical=false&limit=50&api_key=${API_KEY}`)).data
  const pronunciation = wordPronunciation.map(obj => obj.raw)
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
  return { word, definition, audio, example, pronunciation }
}
