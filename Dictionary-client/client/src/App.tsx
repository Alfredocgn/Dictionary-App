import { CssBaseline, createTheme } from "@mui/material"
import Layout from "./components/Layout/Layout"
import { ThemeProvider } from "@mui/material/styles"
import { ThemeContext } from "./components/Theme/Theme"
import { useContext } from "react"




function App() {

  const {isDarkMode} = useContext(ThemeContext)

const theme = createTheme({
  palette:{
    mode: isDarkMode ? 'dark' : 'light'
  }
})


  

  return (
  
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout/>
    </ThemeProvider>


  )
}

export default App
