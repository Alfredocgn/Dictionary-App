import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/Theme';

export default function NavBar() {
    const {isDarkMode,toggleTheme} = useContext(ThemeContext)
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
          <Switch
              aria-label="login switch"
              checked={isDarkMode} 
              onChange={toggleTheme}
            />
        </Toolbar>
      </AppBar>
    </Box>
  );
}