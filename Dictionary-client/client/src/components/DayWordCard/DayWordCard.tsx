import {Grid,Container,List,ListItem,ListItemText } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
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

export default function DayWordCard() {
const [wordOfTheDay,SetWordOfTheDay] = useState<WordOfTheDay | null>(null)

useEffect(() => {
    const fetchWordOfTheDay =  () => {
        fetch(`http://localhost:3001/random`)
        .then(response => response.json())
        .then(data => {
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
return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
        <CardContent>
            <Typography variant='h3' gutterBottom>
            Word of the Day
            </Typography>
            {wordOfTheDay?.word && (
            <Container sx={{ borderBottom: '0.05rem solid' }}>
                <Typography variant="h5" sx={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>
                {(wordOfTheDay.word).toUpperCase()}
                </Typography>
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