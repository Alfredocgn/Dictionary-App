import {useState} from 'react'
import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import { SearchBar } from "../SearchBar/SearchBar"
import SearchCard from "../Card/SearchCard"
import DayWordCard from "../DayWordCard/DayWordCard"


const Layout = ({toggleTheme, isDarkMode} : {toggleTheme: () => void, isDarkMode : boolean}) => {
const [searchWord,setSearchWord]=useState('')
const [definitions,setDefinitions] = useState([])

const handleSearch=(searchResult) =>{
setSearchWord(searchResult.word)
setDefinitions(searchResult.definitions)
}

return (
    <Box>
        <NavBar passTheme={toggleTheme} mode={isDarkMode} />
        <Box sx={{display:'flex'}}>
            <Container sx={{flexGrow:1,margin:'1rem',heigth:'100vh',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem'}}>
                <DayWordCard/>
            </Container>
            <Container sx={{flexGrow:1,margin:'1rem',height:'100vh',border:`0.15rem solid ${isDarkMode ? '#f50057' : '#f50057'}`,borderRadius:'2rem'}}>
                <SearchBar onSearch={handleSearch}/>
                <SearchCard searchWord={searchWord} definitions={definitions}/>
            </Container>
        </Box>


    </Box>
)
}

export default Layout