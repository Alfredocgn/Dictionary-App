import {Box,Container,List,ListItem,ListItemText } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DayWordCard() {
  return (
    <Box sx={{ display:'flex',flexDirection:'column', alignItems:'center',width:'100%'}}>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography variant='h3' gutterBottom>
                    Word of the Day
                </Typography>
                <Container sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%'}}>
                <Typography variant="h5">
                    Benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    phonetics
                </Typography>
                </Container>
                <Container>
                <Typography>
                Adjective
                </Typography>
                <List>      
                   Meaning
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem >
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem>
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem>
                </List>                 
                    <Typography>
                         Synonysm :  kind, compassionate
                    </Typography>
                    <List>      
                   Verb
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem >
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem>
                   <ListItem component='li'>
                    <ListItemText>
                    well meaning and kindly.
                    </ListItemText>
                   </ListItem>
                </List>   

                </Container>


            </CardContent>          
    </Box>
  );
}