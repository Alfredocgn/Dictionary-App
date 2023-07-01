import {
  Button,
  Container,
  List,
  Grid,
  Box,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { WordInfo } from "../Layout/Layout";
import {MouseEvent} from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';



type SearchCardProps = {
  wordInfo: WordInfo;
  handleResetSearch: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNewWord: any;
};

export default function SearchCard({
  wordInfo,
  handleResetSearch,
  setNewWord,
}: SearchCardProps) {
  const [, setIsPlayingAudio] = useState(false);

  const playAudio = () => {
    if (wordInfo?.audio) {
      const audio = new Audio(wordInfo.audio[0]);
      audio.play();
      setIsPlayingAudio(true);
      setTimeout(() => {
        audio.pause();
        setIsPlayingAudio(false);
      }, 3000);
    }
  };
// console.log(wordInfo.definition)

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <CardContent>
          <Container sx={{ borderBottom: "0.05rem solid" }}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "0.25rem", fontWeight: "bold" }}
            >
              {wordInfo?.word.toUpperCase()}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={{ color: "secondary.main" }}>
                  {wordInfo.pronunciation}
                </Typography>
              </Grid>
              <Grid item>
                <Button>
                  <PlayCircleOutlineIcon onClick={playAudio} fontSize="large" />
                </Button>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <>
              <Typography sx={{ fontWeight: "bold" }}>Meaning</Typography>
              <List>
                { 
                wordInfo.definition?.map((el, index) => {
                  return (
                    <ul
                      key={index}
                      // sx={{
                      //   "&::before": {
                      //     content: "'\\2022'",
                      //     marginRight: "8px",
                      //     fontSize: "2rem",
                      //     color: "secondary.main",
                      //     wordBreak: "break-word"
                      //   },
                      // }}
  
                    >
                      <li>
                      {el?.split(" ").map((word, index) => {
                        if (word.length <= 2) {
                          return <p style={{marginRight: '0.25rem',display:'inline-block'}} key={index}>{`  ${word}`}</p>;
                        } else {
                          return (
                            <p
                              style={{
                                cursor: "pointer",
                                marginRight : '0.25rem',
                                display:'inline-block'
                              }}
                              onClick={(event: MouseEvent<HTMLSpanElement>) => {
                                const target = event.target as HTMLSpanElement
                                setNewWord(target.innerHTML.replace(/[^\w\s]/g, ' '));
                              }}
                              key={index}
                            >{`${word}`}</p>
                          );
                        }
                      })}
                      {/* <ListItemText primary={el} /> */}
                      </li>
                    </ul>
                  );
                })

                }
              </List>
            </>

            <>
              <Typography sx={{ fontWeight: "bold" }}>Examples</Typography>
              <p>
                {
                wordInfo.example.map((el, index) => {
                  return (
                  <ul
                    key={index}
                    // sx={{
                    //   "&::before": {
                    //     content: "'\\2022'",
                    //     marginRight: "8px",
                    //     fontSize: "2rem",
                    //     color: "secondary.main"
                    //   },
                    // }}
                    
                  >
                    <li>
                    {el.split(" ").map((word,index)=>{
                    if(word.length<=2){
                      return(<p style={{cursor:'pointer',display:'inline-block',marginRight:'0.25rem'}} key={index}>{`${word}`}</p>)
                    }else{
                      return(
                        <p    
                        style={{cursor:'pointer',display:'inline-block',marginRight:'0.25rem'}}                 
                        onClick={(event)=>{
                          const target = event.target as HTMLSpanElement
                          setNewWord(target.innerHTML.replace(/[^\w\s]/g, ' '))
                        }}
                        key={index}
                        >
                          {`${word}`}

                        </p>
                      )
                    }
                  })}
                  </li>
                  </ul>

                  )
                })
                }
              </p>
            </>
          </Container>
        </CardContent>
      </Grid>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          onClick={handleResetSearch}
          variant="contained"
          color="secondary"
        >
          <Typography sx={{ fontWeight: "bold" }}>Find a new Word!</Typography>
        </Button>
      </Box>
    </Grid>
  );
}
