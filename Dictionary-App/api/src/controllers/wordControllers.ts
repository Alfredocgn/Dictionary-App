import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { API_KEY, MERRIAM_API_KEY } = process.env;

const WORDNIK_GET_WORD_API_ENDPOINT = "https://api.wordnik.com/v4/word.json";



// export const getRandomWord = async () => {
//   try {
//     const randomWord = (
//       await axios.get(
//         `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
//       )
//     ).data;
//     const result = randomWord;
//     console.log(result.word)
//     const rawWordInfoBackUp = await axios.get(
//       `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${result.word}?key=${MERRIAM_API_KEY}`
//     );
//     const backupPronunciation = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.mw;
//     const backupSound = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.sound?.audio;
//   } catch (error) { console.log(error) }
//   const randomWord = {
//     result,
//     backupPronunciation,
//     backupSound
//   }
//   return randomWord
// };

export const getRandomWord = async () => {
  try {
    const randomWord = (
      await axios.get(
        `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
      )
    ).data;
    console.log(randomWord.word);

    const rawWordInfoBackUp = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord.word}?key=${MERRIAM_API_KEY}`
    );
    const backupPronunciation = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.mw;
    // const backupSound = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.sound?.audio;

    const wordAudio = await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${randomWord.word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`
    );
    const backupSound = wordAudio.data.map((obj: { fileUrl: string }) => obj.fileUrl);

    const randomWordData = {
      result: randomWord,
      backupPronunciation,
      backupSound
    };

    return randomWordData;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const getWord = async (word: string) => {
  let finalDef: string[] = [];
  let finalExample: string[] = [];
  let finalAudio: string[] = [];
  let finalPronunciation: string[] = [];

  try {
    const wordDef = await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/definitions?limit=200&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${API_KEY}`
    );
    finalDef = wordDef.data.map((obj: { text: string }) => obj.text);

    const wordAudio = await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`
    );
    finalAudio = wordAudio.data.map((obj: { fileUrl: string }) => obj.fileUrl);

    const wordExample = await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/examples?includeDuplicates=false&useCanonical=false&limit=5&api_key=${API_KEY}`
    );
    finalExample = wordExample.data.examples
      .map((obj: { text: string }) => obj.text)
      .slice(0, 2)
      .filter((ex: string, index: number, self: string[]) => self.indexOf(ex) === index);

    const wordPronunciation = await axios.get(
      `${WORDNIK_GET_WORD_API_ENDPOINT}/${word}/pronunciations?useCanonical=false&limit=50&api_key=${API_KEY}`
    );
    finalPronunciation = wordPronunciation.data.map((obj: { raw: string }) => obj.raw);

    const rawWordInfoBackUp = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${MERRIAM_API_KEY}`
    );
    const backupDef = rawWordInfoBackUp.data[0]?.shortdef || [];
    const backupPronunciation = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.mw;
    const backupSound = rawWordInfoBackUp.data[0]?.hwi?.prs?.[0]?.sound?.audio;
    const backupQuote = rawWordInfoBackUp.data[0]?.quotes || [];

    finalDef.push(...backupDef);
    finalExample.push(...backupQuote);
    finalAudio.push(...backupSound);
    finalPronunciation.push(...backupPronunciation);

    // // Filtrar elementos falsy en todos los arrays
    // finalDef = finalDef.filter(Boolean).slice(0, 4);
    // finalExample = finalExample.filter(Boolean).slice(0, 4);
    // finalAudio = finalAudio.filter(Boolean).slice(0, 4);
    // finalPronunciation = finalPronunciation.filter(Boolean).slice(0, 4);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }

  const wordInfo = {
    word,
    finalDef,
    finalExample,
    finalAudio,
    finalPronunciation
  };

  return wordInfo;
};
