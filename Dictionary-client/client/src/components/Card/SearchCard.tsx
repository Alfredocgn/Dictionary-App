import {
  Button,
  Container,
  List,
  ListItem,
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


  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <CardContent>
          <Container sx={{ borderBottom: "0.05rem solid" }}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "0.25rem", fontWeight: "bold" }}
            >
              {wordInfo.word.toUpperCase()}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={{ color: "secondary.main" }}>
                  {wordInfo.pronunciation[0]}
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
                {wordInfo.definition.map((el, index) => {
                  return (
                    <ListItem
                      key={index}
                      sx={{
                        "&::before": {
                          content: "'\\2022'",
                          marginRight: "8px",
                          fontSize: "2rem",
                          color: "secondary.main",
                        },
                      }}
                    >
                      {el.split(" ").map((word, index) => {
                        if (word.length <= 2) {
                          return <Typography sx={{display:'flex'}} key={index}>{`${word}`}</Typography>;
                        } else {
                          return (
                            <Typography
                            component='span'
                              sx={{
                                cursor: "pointer",
                                display:'flex',
                                marginRight:'5px'
                              }}
                              onClick={(event: MouseEvent<HTMLSpanElement>) => {
                                const target = event.target as HTMLSpanElement
                                setNewWord(target.innerHTML);
                              }}
                              key={index}
                            >{`${word}`}</Typography>
                          );
                        }
                      })}
                      {/* <ListItemText primary={el} /> */}
                    </ListItem>
                  );
                })}
              </List>
            </>

            <>
              <Typography sx={{ fontWeight: "bold" }}>Examples</Typography>
              <List>
                {wordInfo.example.map((el, index) => {
                  return (
                  <ListItem
                    key={index}
                    sx={{
                      "&::before": {
                        content: "'\\2022'",
                        marginRight: "8px",
                        fontSize: "2rem",
                        color: "secondary.main",
                        overflowWrap: "break-word"
                        

                      },
                    }}
                  >{el.split(" ").map((word,index)=>{
                    if(word.length<=2){
                      return(<Typography sx={{overflowWrap: "break-word"}}key={index}>{`${word}`}</Typography>)
                    }else{
                      return(
                        <Typography>
                        <span
                        style={{cursor:'pointer', marginRight:'5px'}}
                        onClick={(event)=>{
                          const target = event.target as HTMLSpanElement
                          setNewWord(target.innerHTML)
                        }}
                        key={index}
                        >
                          {`${word}`}
                        </span>

                        </Typography>
                      )
                    }
                  })}
                  </ListItem>

                  )
                })}
              </List>
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
