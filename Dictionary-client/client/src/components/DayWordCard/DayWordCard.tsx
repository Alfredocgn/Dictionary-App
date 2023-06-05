import {Grid,Container,List,ListItem,ListItemText, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import cron from 'node-cron'

type Definition = {
    definition: string;
    text: string;
}

type Example ={
    text:string
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

export default function DayWordCard({wordOfTheDay }) {
    console.log(wordOfTheDay)
// const [wordOfTheDay,SetWordOfTheDay] = useState<WordOfTheDay | null>(null)
// const [aditionalInfo,setAditionalInfo] = useState<AditionalInfo>()

// useEffect(() => {
//     const fetchWordOfTheDay =  () => {
//         fetch(`http://localhost:3001/random`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             SetWordOfTheDay(data);
//             localStorage.setItem('wordOfTheDay',JSON.stringify(data))        
//         })
//     }

//     const cachedWordOfTheDay = localStorage.getItem('wordOfTheDay');

//     if(cachedWordOfTheDay){
//         const cachedData = JSON.parse(cachedWordOfTheDay)
//         const publishDate = new Date(cachedData.publishDate)
//         const currentDate = new Date()
//         if(publishDate.toDateString() !== currentDate.toDateString()){
//             fetchWordOfTheDay()
//         }else{
//             SetWordOfTheDay(cachedData)
//         }
//     }else {

//         fetchWordOfTheDay()
//     }
// },[])

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


return (
    <Grid container sx={{justifyContent:"center" , alignItems:"center",display:'flex'}} >
        <Grid item xs={12}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h3'>
            Word of the Day
            </Typography>
            {wordOfTheDay?.word && (
            <Container sx={{ borderBottom: '0.05rem solid' }}>
                <Typography variant="h5" sx={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>
                {(wordOfTheDay.word).toUpperCase()}
                </Typography>
                <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                <Typography sx={{ color: "secondary.main" }}>
                    hola
                </Typography>
                </Grid>
                <Grid item>
                <Button>
                    <PlayCircleOutlineIcon  fontSize='large'/>
                </Button>
                </Grid>
            </Grid>
            </Container>
            )}
            <Container>
            {wordOfTheDay && (
                <>
                <Typography sx={{ fontWeight: 'bold' }}>Meaning</Typography>
                <List>
                    {wordOfTheDay?.definitions &&
                    wordOfTheDay.definitions.map((el, index) => (
                        <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                        <ListItemText primary={el.text} />
                        </ListItem>
                    ))}
                </List>
                </>
            )}
            {wordOfTheDay && (
                <>
                <Typography sx={{ fontWeight: 'bold' }}>Examples</Typography>
                <List>
                    {wordOfTheDay?.examples &&
                    wordOfTheDay.examples.map((el, index) => (
                        <ListItem key={index} sx={{ "&::before": { content: "'\\2022'", marginRight: "8px", fontSize: "2rem", color: "secondary.main" } }}>
                        <ListItemText primary={el.text} />
                        </ListItem>
                    ))}
                </List>
                </>
            )}
            </Container>
        </CardContent>
        </Grid>
    </Grid>
    );
}