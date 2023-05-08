import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import OutlinedCard from "../Card/Card"
import { SearchBar } from "../SearchBar/SearchBar"


const Layout = () => {
  return (
    <Box>
        <NavBar/>
        <Box sx={{display:'flex'}}>
            <Container sx={{flexGrow:1,border:'1px solid white',margin:'1rem',padding:'1rem',heigth:'100vh'}}>
                <OutlinedCard/>
            </Container>
            <Container sx={{flexGrow:1,border:'1px solid white',margin:'1rem',padding:'1rem',height:'100vh'}}>
                <SearchBar/>
                <OutlinedCard/>
            </Container>
        </Box>


    </Box>
  )
}

export default Layout