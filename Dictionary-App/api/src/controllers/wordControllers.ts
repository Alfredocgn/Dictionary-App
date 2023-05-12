import axios from 'axios'


export const getRandomWord = async () => {
  const randomWord = (await axios.get('https://developer.wordnik.com/docs#!/words/getRandomWord')).data
}


export const getWord = async (word:string) => {
  const wordDef = (await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)).data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = wordDef.map((el: any) => {
    return {
      word: el.word,
      def: el.meanings[0].definitions[0].definition,
      phonetic: el.phonetics[0]?.text,
      synonyms: el.meanings[0].definitions[0].synonyms?.map((synonym:string) => synonym),
      antonyms: el.meanings[0].definitions[0].antonyms?.map((antonym:string) => antonym),
      partOfSpeech: el.meanings[0].partOfSpeech,
      source: el.sourceUrls[0],
      audio: el.phonetics[0]?.audio
    }
  })
  console.log(result.map(e => e.def))
  return result
}
