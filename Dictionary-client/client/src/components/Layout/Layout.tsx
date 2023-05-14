import {useState} from 'react'
import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import { SearchBar } from "../SearchBar/SearchBar"
import SearchCard from "../Card/SearchCard"
import DayWordCard from "../DayWordCard/DayWordCard"

interface  SearchResult {
    word: string;
    definitions: {def:string}[];
}


const Layout = ({toggleTheme, isDarkMode} : {toggleTheme: () => void, isDarkMode : boolean}) => {
const [searchWord,setSearchWord]=useState('')
const [definitions,setDefinitions] = useState<{def:string}[]>([])
const [word,setWord] = useState<string>('')

const handleSearch=(searchResult : SearchResult) =>{
setSearchWord(searchResult.word)
setDefinitions(searchResult.definitions)
}
const handleResetSearch  = () => {
    setSearchWord('')
    setDefinitions([])
    setWord('')
}

return (
    <Box>
        <NavBar passTheme={toggleTheme} mode={isDarkMode} />
        <Box sx={{display:'flex'}}>
            <Container sx={{flexGrow:1,margin:'1rem',heigth:'100vh',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem'}}>
                <DayWordCard/>
            </Container>
            <Container sx={{flexGrow:1,margin:'1rem',height:'100vh',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem'}}>
                <SearchBar word={word} setWord={setWord} onSearch={handleSearch}/>
                <SearchCard word={word} searchWord={searchWord} definitions={definitions} handleResetSearch={handleResetSearch}/>
            </Container>
        </Box>


    </Box>
)
}

export default Layout