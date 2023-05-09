import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import { SearchBar } from "../SearchBar/SearchBar"
import SearchCard from "../Card/SearchCard"
import DayWordCard from "../DayWordCard/DayWordCard"


const Layout = ({toggleTheme, isDarkMode} : {toggleTheme: () => void, isDarkMode : boolean}) => {
  return (
    <Box>
        <NavBar passTheme={toggleTheme} mode={isDarkMode} />
        <Box sx={{display:'flex'}}>
            <Container sx={{flexGrow:1,margin:'1rem',heigth:'100vh',border:`1px solid ${isDarkMode ? '#f5f5f5' : '#212121'}`}}>
                <DayWordCard/>
            </Container>
            <Container sx={{flexGrow:1,margin:'1rem',height:'100vh',border:`1px solid ${isDarkMode ? '#f5f5f5' : '#212121'}`}}>
                <SearchBar/>
                <SearchCard/>
            </Container>
        </Box>


    </Box>
  )
}

export default Layout