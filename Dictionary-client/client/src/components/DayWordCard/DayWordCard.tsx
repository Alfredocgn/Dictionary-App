import {Grid,Container,List, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from "react";
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
type Pronunciation = {
    pronunciation:string[];
}
type Audio ={
    audio:string[];
}

export type WordOfTheDay = {
    word:string;
    phonetics:string;
    definitions:Definition[];
    examples: Example[];
    pronunciation: Pronunciation[];
    audio:Audio[];
}

// type AditionalInfo = {
//     audio: string[];
//     pronunciation:string[];
// }

type DayPropsCard  ={
    wordOfTheDay : WordOfTheDay | null;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setNewWord: any;
}

export default function DayWordCard({wordOfTheDay, setNewWord} : DayPropsCard) {
    const [,setIsPlayingAudio] = useState(false)

    const playAudio = () => {
        if (wordOfTheDay?.audio) {
            const audio = new Audio(wordOfTheDay.audio[0]);
            audio.play();
            setIsPlayingAudio(true);
            setTimeout(() => {
                audio.pause();
                setIsPlayingAudio(false);
            }, 3000);
            }
        };

// const def = wordOfTheDay?.definitions
// const words = def?.map(d => ({
//     original:d.text,
//     withoutPunctuation: d.text.replace(/[^\w\s]/g, ' ')

// }))
// console.log(words)
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
                    {wordOfTheDay.pronunciation}
                </Typography>
                </Grid>
                <Grid item>
                <Button>
                    <PlayCircleOutlineIcon onClick={playAudio}  fontSize='large'/>
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
                                            return(<p 
                                                key={index} 
                                                style={{cursor:'pointer',display:'inline-block', marginRight:'0.25rem'}}>
                                                    {`${word}`}
                                                    </p>)
                                        } else {
                                            return(
                                                <p
                                                key={index}
                                                onClick={(e)=>{
                                                    const target = e.target as HTMLSpanElement
                                                    setNewWord(target.innerHTML.replace(/[^\w\s]/g, ' '))
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
                                                    const target = e.target as HTMLSpanElement
                                                    setNewWord(target.innerHTML.replace(/[^\w\s]/g, ' '))
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