import {Box,Button,Container,List,ListItem,ListItemText} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Definition = {
  def:string
  phonetic:string
}

type SearchCardProps = {
  searchWord:string
  definitions: Definition []
  handleResetSearch: () => void 
}

export default function SearchCard({searchWord,definitions,handleResetSearch}:SearchCardProps) {
  return (


<Box sx={{ display:'flex',flexDirection:'column', alignItems:'center',width:'100%'}}>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
                <Container sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%',borderBottom:'0.05rem solid'}}>
                <Typography variant="h5" sx={{marginBottom:'0.25rem',fontWeight:'bold'}}>
                  {searchWord}
                </Typography>
                {definitions.map((definitions,index)=>(
                <Typography key={index} sx={{ color:'secondary.main' }}>
                  {definitions.phonetic}
                    
                </Typography>

                ))}
                </Container>
                <Container>
                <List>  
                    <Typography sx={{fontWeight:'bold'}}>
                  Meaning
                    </Typography>  
                    {definitions.map((definitions,index)=>(
                      <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                        <ListItemText primary={definitions.def}/>
                      </ListItem>

                    ))

                    }  
  
                </List>                 
                    <Typography sx={{fontWeight:'bold',borderTop:'0.05rem solid'}}>
                        Synonysm
                    </Typography>
                    <Typography sx={{color:'secondary.main'}}>
                        kind, compassionate
                    </Typography>
                </Container>
            </CardContent> 
            {searchWord && 
            <Button onClick={handleResetSearch} variant='contained' color='secondary'>
              <Typography sx={{fontWeight:'bold'}}>
              Find a new Word!
              </Typography>
              </Button>       
            
            }
    </Box>
          

  );
}