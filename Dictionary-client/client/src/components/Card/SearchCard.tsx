import {Button,Container,List,ListItem,ListItemText,Grid,Box} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {SearchResult} from '../Layout/Layout' 
import { useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

type Definition = {
  word: string,
  definition: string[]
  audio:string[]
  example:string[]
  pronunciation:string[]
  
}

type SearchCardProps = {
  searchWord:string
  wordInfo: Definition
  handleResetSearch: () => void 
  word:string
  onSearch: (data:SearchResult) => void
}

export default function SearchCard({searchWord,wordInfo,handleResetSearch}:SearchCardProps) {
  const [isPlayingAudio,setIsPlayingAudio] = useState(false)
  console.log(isPlayingAudio)

  const playAudio = () => {
    if(wordInfo?.audio){
      const audio = new Audio(wordInfo.audio[0])
      audio.play()
      setIsPlayingAudio(true)
      setTimeout(()=>{
        audio.pause()
        setIsPlayingAudio(false)
      },3000)
    }

  }


  return (
    <Grid container justifyContent='center' alignItems='center' spacing={2}>
  <Grid item xs={12}>  
    <CardContent>    
      {searchWord && (              
        <Container sx={{borderBottom:'0.05rem solid'}}>
          <Typography variant="h5" sx={{marginBottom:'0.25rem',fontWeight:'bold'}}>
            {searchWord.toUpperCase()}
          </Typography>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography sx={{ color:'secondary.main' }}>
                {wordInfo.pronunciation[0]}                    
              </Typography>
            </Grid>
            <Grid item>
              <Button>
                <VolumeUpIcon onClick={playAudio} />
              </Button>
            </Grid>                  
          </Grid> 
        </Container>
      )}  
      <Container>
        {searchWord && (
          <>
            <Typography sx={{fontWeight:'bold'}}>Meaning</Typography>
            <List>
              {wordInfo.definition.map((el,index)=>(
                <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                  <ListItemText primary={el}/>
                </ListItem>
              ))}
            </List>  
          </>
        )}
        {searchWord && (
          <>
            <Typography sx={{fontWeight:'bold'}}>Examples</Typography>  
            <List>
              {wordInfo.example.map((el,index)=>(
                <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                  <ListItemText primary={el}/>
                </ListItem>
              ))}
            </List>
          </>
        )}                 
      </Container>
    </CardContent> 
  </Grid>
  {searchWord && (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
      <Button onClick={handleResetSearch} variant='contained' color='secondary'>
        <Typography sx={{fontWeight:'bold'}}>
          Find a new Word!
        </Typography>
      </Button>      
    </Box> 
  )}
</Grid>
  )}


