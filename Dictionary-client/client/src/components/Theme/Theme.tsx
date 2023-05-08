import React,{useState} from 'react'

export const ThemeContext = React.createContext<{
    isDarkMode: boolean;
    toggleTheme: () => void;
  }>({
    isDarkMode: false,
    toggleTheme: () => {},
  })

export function ThemeProvider(props:any) {
    const [isDarkMode,setIsDarkMode] = useState(false)

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    const theme = {
        palette:{
            mode:isDarkMode ? 'dark' : 'light',
        }
    }

    return (
        <ThemeContext.Provider value={{isDarkMode,toggleTheme}}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>

        </ThemeContext.Provider>
    )
}