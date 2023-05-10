import { Paper,TextField,IconButton,Box,Typography } from '@mui/material'
import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = ({onSearch}) => {
  const [word,setWord] = useState('')
  const [definitions,setDefinitions]=useState<{word: string,def:string}[]>([])
  const[searchWord,setSearchWord] =useState('')
  const showClearButton = word.length>0
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setWord(e.target.value)
  }
  const handleClearClick = ()=>{
    setWord('')
    setDefinitions([])
  }

  const handleSearch = () =>{
    fetch(`http://localhost:3001?word=${word}`)
    .then(response => response.json())
    .then(data => {
      setDefinitions(data)
      setSearchWord(word)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Box sx={{display:'flex',justifyContent:'center',width:'100%',marginTop:'1rem'}}>
      <Paper sx={{display:'flex',width:'100%'}}>
        <TextField
        sx={{'& fieldset': {border:'none'}, width:'100%'}}
        onChange={handleChange} 
        placeholder='Insert your word'
        value ={word}
        />{showClearButton && 
          <IconButton onClick={handleClearClick} type='button' aria-label='search'>
            <ClearIcon/>
          </IconButton>}
          <IconButton onClick={handleSearch}>
            <SearchIcon/>
          </IconButton>
      </Paper>
    </Box>


  )
}
