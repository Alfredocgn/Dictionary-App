import {Grid,Container,List,ListItem,ListItemText, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import { useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import cron from 'node-cron'

type Definition = {
    definition: string;
    text: string;
}

type Example ={
    text:string
}

export type WordOfTheDay = {
    word:string;
    phonetics:string;
    definitions:Definition[];
    examples: Example[];
}

// type AditionalInfo = {
//     audio: string[];
//     pronunciation:string[];
// }

type DayPropsCard  ={
    wordOfTheDay : WordOfTheDay | null;
    setNewWord: string[];
}

export default function DayWordCard({wordOfTheDay, setNewWord} : DayPropsCard) {

const def = wordOfTheDay?.definitions
const words = def?.map(d => d.text.match(/\b\w+\b/g))
console.log(words?.[0].map(el=>el))
// const joinWords = words?.join(' ')
// console.log(joinWords)
// console.log(words?.[0].map(el => console.log(el)))
// const showWords = words?.map(el => {
//     console.log(el)
// })

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
                    wordOfTheDay.definitions.map((el, index) => {
                        return(
                            <ul key={index}>
                                <li>
                                    {el.text.split(' ').map((word,index)=>{
                                        if(word.length<2){
                                            return(<p key={index} style={{cursor:'pointer',display:'inline-block', marginRight:'0.25rem'}}>{`${word}`}</p>)
                                        }else{
                                            return(
                                                <p
                                                key={index}
                                                onClick={(e)=>{
                                                    const target = e.target
                                                    setNewWord(target.innerHTML)
                                                }} 
                                                style={{cursor:'pointer',display:'inline-block', marginRight:'0.25rem'}}>{`${word}`}</p>
                                            )
                                        }
                                    })}
                                </li>
                            </ul>
                        )
                    })}
                </List>
                </>
            )}
            {wordOfTheDay && (
                <>
                <Typography sx={{ fontWeight: 'bold' }}>Examples</Typography>
                <List>
                    {wordOfTheDay?.examples &&
                    wordOfTheDay.examples.map((el, index) =>{
                        return(
                            <ul key={index}>
                                <li>
                                    {el.text.split(" ").map((word,index)=>{
                                        if(word.length<=2){
                                            return(<p key={index} style={{cursor:'pointer',display:'inline-block',marginRight:'0.25rem'}}>{`${word}`}</p>)
                                        }else{
                                            return(<p
                                                onClick={(e)=>{
                                                    const target = e.target
                                                    setNewWord(target.innerHTML)
                                                }}
                                                key={index} 
                                                style={{cursor:'pointer',display:'inline-block',marginRight:'0.25rem'}}>{`${word}`}</p>)
                                        }
                                    })}
                                </li>

                            </ul>
                        )
                    })}
                </List>
                </>
            )}
            </Container>
        </CardContent>
        </Grid>
    </Grid>
    );
}