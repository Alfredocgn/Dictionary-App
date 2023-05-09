import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch,Grid } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/ThemeContext';



export default function NavBar({passTheme,mode}:{passTheme:(mode:boolean)=>void,mode:boolean}) {


  const {toggleTheme} = useContext(ThemeContext)
  
  return (
    <Box sx={{ flexGrow: 1 ,width:'100%',margin:'1rem'}}>
      <AppBar position="static" sx={{width:'100%'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid>
          <Switch
              aria-label="login switch"
              checked={mode}
              onChange={toggleTheme}
              onClick={()=> passTheme(!mode)}
            />

          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}