import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { API_KEY, MERRIAM_API_KEY } = process.env;

const WORDNIK_GET_WORD_API_ENDPOINT = "https://api.wordnik.com/v4/word.json";



export const getRandomWord = async () => {
  const randomWord = (
    await axios.get(
      `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
    )
  ).data;
  const result = randomWord;
  return result;
};

export const getWord = async (word: string) => {
  const wordDef = (
    await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/definitions?limit=200&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${API_KEY}`
    )
  ).data;
  const rawDefinition = wordDef.map((obj) => obj.text);
  const sliceDefinition = rawDefinition.slice(0, 2);
  const definition = sliceDefinition.filter(
    (definition) => definition !== undefined
  );
  const wordAudio = (
    await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`
    )
  ).data;
  const audio = wordAudio.map((obj) => obj.fileUrl);
  const wordExample = (
    await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/examples?includeDuplicates=false&useCanonical=false&limit=5&api_key=${API_KEY}`
    )
  ).data;
  const rawExample = wordExample.examples.map((obj) => obj.text);
  const sliceExample = rawExample.slice(0, 2);
  const example = sliceExample.filter((example, index, self) => {
    return self.indexOf(example) === index;
  });
  const wordPronunciation = (
    await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/pronunciations?useCanonical=false&limit=50&api_key=${API_KEY}`
    )
  ).data;
  const pronunciation = wordPronunciation.map((obj) => obj.raw);
  const rawWordInfoBackUp = (
    await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${MERRIAM_API_KEY}`)
  ).data
  const wordInfo = rawWordInfoBackUp
  const backupDef = wordInfo[0].shortdef
  const backupPronunciation = wordInfo[0].hwi.prs[0].mw
  const backupSound = wordInfo[0].hwi.prs[0].sound.audio
  const backupQuote = wordInfo[0].quotes


  return { word, definition, audio, example, pronunciation, backupDef, backupPronunciation, backupSound, backupQuote };
};


