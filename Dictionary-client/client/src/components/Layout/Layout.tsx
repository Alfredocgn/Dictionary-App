import {useState} from 'react'
import { Box, Container, Typography } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import { SearchBar } from "../SearchBar/SearchBar"
import SearchCard from "../Card/SearchCard"
import DayWordCard from "../DayWordCard/DayWordCard"

export interface  SearchResult {
    word:string
    definition: string[]
    audio:string[]
    example:string[]
    pronunciation:string[]
}

interface WordInfo {
    word: string,
    definition: string[]
    audio:string[]
    example:string[]
    pronunciation:string[]

}


const Layout = ({toggleTheme, isDarkMode} : {toggleTheme: () => void, isDarkMode : boolean}) => {
const [searchWord,setSearchWord]=useState('')
const [word,setWord] = useState<string>('')
const [wordInfo,setWordInfo]= useState<WordInfo>({
    word:'',
    definition:[],
    audio:[],
    example:[],
    pronunciation:[]
})
const handleSearch=(searchResult : SearchResult) =>{
    setSearchWord(searchResult.word)

    setWordInfo({
        word:searchResult.word,
        definition: searchResult.definition,
        audio:searchResult.audio,
        example:searchResult.example,
        pronunciation:searchResult.pronunciation
    })
}
const handleResetSearch  = () => {
    setSearchWord('')
    setWordInfo({
        word:'',
        definition:[],
        audio:[],
        example:[],
        pronunciation:[]
    })
    setWord('')
}

return (
    <Box>
        <NavBar passTheme={toggleTheme} mode={isDarkMode} />
        <Box sx={{display:'flex'}}>
            <Container sx={{flexGrow:1,margin:'1rem',height:'100vh',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem'}}>
                <DayWordCard/>
            </Container>
            <Container sx={{flexGrow:1,margin:'1rem',height:'auto',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem',padding:'1rem'}}>
                <Typography variant='h3' gutterBottom sx={{display:'flex',justifyContent:'center'}}>
                    Find your Word!
                </Typography>
                <SearchBar word={word} setWord={setWord} onSearch={handleSearch}/>
                <SearchCard onSearch={handleSearch} word={word} searchWord={searchWord} wordInfo={wordInfo} handleResetSearch={handleResetSearch}/>
            </Container>
        </Box>


    </Box>
)
}

export default Layout