import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";
import SearchCard from "../Card/SearchCard";
import DayWordCard from "../DayWordCard/DayWordCard";

export interface SearchResult {
  word: string;
  definition: string[];
  audio: string[];
  example: string[];
  pronunciation: string[];
}

export interface WordInfo {
  word: string;
  definition: string[];
  audio: string[];
  example: string[];
  pronunciation: string[];
}
type WordOfTheDay = {
  word:string;
  phonetics:string;
  definitions:Definition[];
  examples: Example[];
}

type AditionalInfo = {
  audio: string[];
  pronunciation:string[];
}
export type responseStatusType = "idle" | "loading" | "success" | "error";

const Layout = ({
  toggleTheme,
  isDarkMode,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
}) => {
  const [newWord, setNewWord] = useState<string>();
  const [responseStatus, setResponseStatus] =
    useState<responseStatusType>("idle");
  const [wordInfo, setWordInfo] = useState<WordInfo>();
  const [wordOfTheDay,SetWordOfTheDay] = useState<WordOfTheDay | null>(null)
// const [aditionalInfo,setAditionalInfo] = useState<AditionalInfo>()

  useEffect(() => {
    const fetchWordOfTheDay =  () => {
        fetch(`http://localhost:3001/random`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            SetWordOfTheDay(data);
            localStorage.setItem('wordOfTheDay',JSON.stringify(data))        
        })
    }

    const cachedWordOfTheDay = localStorage.getItem('wordOfTheDay');

    if(cachedWordOfTheDay){
        const cachedData = JSON.parse(cachedWordOfTheDay)
        const publishDate = new Date(cachedData.publishDate)
        const currentDate = new Date()
        if(publishDate.toDateString() !== currentDate.toDateString()){
            fetchWordOfTheDay()
        }else{
            SetWordOfTheDay(cachedData)
        }
    }else {

        fetchWordOfTheDay()
    }
},[])

// useEffect(() => {
//     const word = JSON.parse(localStorage.getItem('wordOfTheDay'))
//     console.log(word)
//     fetch(`http://localhost:3001?word=${word.word}`)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//             setAditionalInfo({
//                 audio: data.audio,
//                 pronunciation: data.pronunciation,
//             });
//         })
//         .catch((error) => {
//             console.log(error)
//         ;
//         });
//     },[]);

  useEffect(() => {
    if (newWord) {
      setResponseStatus("loading");
      fetch(`http://localhost:3001?word=${newWord}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setResponseStatus("error");
          } else {
            setResponseStatus("success");
            setWordInfo({
              word: data.word,
              definition: data.definition,
              audio: data.audio,
              example: data.example,
              pronunciation: data.pronunciation,
            });
          }
        })
        .catch(() => {
          setResponseStatus("error");
        });
    }
  }, [newWord]);

  const handleResetSearch = () => {
    setWordInfo(undefined);
    setNewWord(undefined);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <NavBar passTheme={toggleTheme} mode={isDarkMode} />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Container
          sx={{
            flexGrow: 1,
            margin: "1rem",
            height: "auto",
            border: `0.15rem solid ${isDarkMode ? "#f50057" : "#f50057"}`,
            borderRadius: "2rem",
          }}
        >
          <DayWordCard wordOfTheDay= {wordOfTheDay} />
        </Container>
        <Container
          sx={{
            flexGrow: 1,
            margin: "1rem",
            height: "auto",
            border: `0.15rem solid ${isDarkMode ? "#f50057" : "#f50057"}`,
            borderRadius: "2rem",
            padding: "1rem",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Find your Word!
          </Typography>
          <SearchBar setNewWord={setNewWord} responseStatus={responseStatus} />

          {responseStatus === "loading" && <CircularProgress />}
          {responseStatus === "success" && wordInfo && (
            <SearchCard
              wordInfo={wordInfo}
              handleResetSearch={handleResetSearch}
              setNewWord={setNewWord}
            />
          )}
          {responseStatus === "error" && <p>error...</p>}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
