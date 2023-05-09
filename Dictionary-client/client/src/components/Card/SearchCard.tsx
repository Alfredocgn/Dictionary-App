import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




const card = (

    <CardContent sx={{padding:'2rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        benevolent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
);

export default function SearchCard() {
  return (
    <Box sx={{ display:'flex',flexDirection:'column', alignItems:'center',maxWidth:'100%',width:'100%'}}>

        <Card sx={{display:'flex',justifyContent:'center',margin:'1rem'}}>{card}</Card>
          
    </Box>
  );
}