import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Switch,Grid } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/ThemeContext';



export default function NavBar({passTheme,mode}:{passTheme:(mode:boolean)=>void,mode:boolean}) {


  const {toggleTheme} = useContext(ThemeContext)
  
  return (
    <Box sx={{ flexGrow: 1, width: '100%', margin: '1rem'}}>
      <AppBar position="static" sx={{ width: '100%', backgroundColor: 'secondary.main'}}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <Switch
                aria-label="mode switch"
                checked={mode}
                onChange={toggleTheme}
                onClick={() => passTheme(!mode)}
                color='default'
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}