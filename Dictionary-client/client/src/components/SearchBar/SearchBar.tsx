import { Paper,TextField,IconButton,Box } from '@mui/material'
import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchResult } from '../Layout/Layout';

type Definition = string[]
type Props = {
  onSearch: (data:SearchResult) => void;
  word:string;
  setWord: React.Dispatch<React.SetStateAction<string>>
  
}

export const SearchBar = ({onSearch,word,setWord}:Props) => {
  const [definitions,setDefinitions]=useState<Definition>([])
  const showClearButton = word.length>0
  console.log(definitions)
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
      if(data.error) {
        alert(data.error)
              } else {
                onSearch(data)
              }

      // console.log(data)
      setWord('')
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter')
    handleSearch()
  }

  return (
    <Box sx={{display:'flex',justifyContent:'center',width:'100%',marginTop:'1rem'}}>
      <Paper sx={{display:'flex',width:'100%'}}>
        <TextField
        sx={{'& fieldset': {border:'none'}, width:'100%'}}
        onChange={handleChange} 
        placeholder='Insert your word'
        value ={word}
        onKeyDown={handleKeyDown}
        />{showClearButton && 
          <IconButton onClick={handleClearClick} type='button' aria-label='search'>
            <ClearIcon/>
          </IconButton>}
          {word && 
          <IconButton onClick={handleSearch}>
            <SearchIcon/>
          </IconButton>
          }
      </Paper>
    </Box>


  )
}
