import {Box,Button,Container,List,ListItem,ListItemText} from '@mui/material';
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
      const audio = new Audio(wordInfo.audio[1])
      audio.play()
      setIsPlayingAudio(true)
      setTimeout(()=>{
        audio.pause()
        setIsPlayingAudio(false)
      },3000)
    }

  }


  return (


<Box sx={{ display:'flex',flexDirection:'column', alignItems:'center',width:'100%'}}>
  
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>    
            {searchWord && (
              
                <Container sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%',borderBottom:'0.05rem solid'}}>
                
                <Typography variant="h5" sx={{marginBottom:'0.25rem',fontWeight:'bold'}}>
                  {searchWord.toUpperCase()}
                </Typography>

                <Container sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography sx={{ color:'secondary.main' }}>
                  {wordInfo.pronunciation[0]}                    
                </Typography>
                <Button>
                  <VolumeUpIcon onClick={playAudio} />
                </Button>
                  
                  </Container>    

      
                </Container>
            )}  
                <Container>
                <List>  
                  {searchWord && (
                    <Typography sx={{fontWeight:'bold'}}>
                  Meaning
                    </Typography>                    
                  )}
                    {wordInfo.definition.map((el,index)=>(
                      <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                        <ListItemText primary={el}/>
                      </ListItem>

                    ))

                    }  
  
                </List>                 
                <List>  
                  {searchWord && (
                  
                    <Typography sx={{fontWeight:'bold'}}>
                  Examples
                    </Typography>  
                  
                  )}
                    {wordInfo.example.map((el,index)=>(
                      <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                        <ListItemText primary={el}/>
                      </ListItem>

                    ))

                    }  
  
                </List>                 
                </Container>
            </CardContent> 
            {searchWord && ( 
            <Button onClick={handleResetSearch} variant='contained' color='secondary'>
              <Typography sx={{fontWeight:'bold'}}>
              Find a new Word!
              </Typography>
              </Button>       
            
            )}
    </Box>
          

  );
}