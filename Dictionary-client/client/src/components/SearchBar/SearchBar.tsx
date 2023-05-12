import { Paper,TextField,IconButton,Box } from '@mui/material'
import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type Definition = {word:string;def:string}[]
type Props = {
  onSearch: (data:{word:string,definitions:Definition}) => void
}

export const SearchBar = ({onSearch}:Props) => {
  const [word,setWord] = useState<string>('')
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
      console.log(data)
      onSearch({word:word,definitions:data})
      // console.log(onSearch)
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
          {word && 
          <IconButton onClick={handleSearch}>
            <SearchIcon/>
          </IconButton>
          }
      </Paper>
    </Box>


  )
}
