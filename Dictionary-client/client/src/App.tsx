import { CssBaseline, createTheme } from "@mui/material"
import Layout from "./components/Layout/Layout"
import { ThemeProvider } from "@mui/material/styles"
import { useState,useEffect } from "react"






function App() {
  const [isDarkMode,setIsDarkMode] = useState(false)
  useEffect(()=>{
    const storedDarkMode = localStorage.getItem('isDarkMode')
    if(storedDarkMode){
      setIsDarkMode(JSON.parse(storedDarkMode))
    }
  },[])
  const toggleTheme = () =>{
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('isDarkMode',JSON.stringify(newDarkMode))
  }

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: isDarkMode ? "#303030" : "#fff",
        paper: isDarkMode ? "#424242" : "#f5f5f5",
      },
      text: {
        primary: isDarkMode ? "#fff" : "#212121",
        secondary: isDarkMode ? "#f5f5f5" : "#757575",
      },
    },
  });

  


  

  return (
  
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </ThemeProvider>


  )
}

export default App
