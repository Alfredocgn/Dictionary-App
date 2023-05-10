import {Box,Container,List,ListItem,ListItemText } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DayWordCard() {
  return (
    <Box sx={{ display:'flex',flexDirection:'column', alignItems:'center',width:'100%'}}>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
                <Typography variant='h3' gutterBottom>
                    Word of the Day
                </Typography>
                <Container sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%',borderBottom:'0.05rem solid'}}>
                <Typography variant="h5" sx={{marginBottom:'0.25rem',fontWeight:'bold'}}>
                    Benevolent
                </Typography>
                <Typography sx={{ color:'secondary.main' }}>
                    phonetics
                </Typography>
                </Container>
                <Container>
                <List>  
                    <Typography sx={{fontWeight:'bold'}}>
                   Meaning
                    </Typography>    
                   <ListItem sx={{ '&::before': { content: "'\\2022'", marginRight: '8px', fontSize: '2rem', color: 'secondary.main' } }} >
                    <ListItemText primary='well meaning and kindly.'/>
                   </ListItem >
                   <ListItem sx={{ '&::before': { content: "'\\2022'", marginRight: '8px', fontSize: '2rem', color: 'secondary.main' } }}>
                    <ListItemText primary='well meaning and kindly.'/>
                   </ListItem>
                   <ListItem sx={{ '&::before': { content: "'\\2022'", marginRight: '8px', fontSize: '2rem', color: 'secondary.main' } }}>
                    <ListItemText primary='well meaning and kindly.'/>
                   </ListItem>
                </List>                 
                    <Typography sx={{fontWeight:'bold',borderTop:'0.05rem solid'}}>
                         Synonysm
                    </Typography>
                    <Typography sx={{color:'secondary.main'}}>
                        kind, compassionate
                    </Typography>
                </Container>
            </CardContent>          
    </Box>
  );
}