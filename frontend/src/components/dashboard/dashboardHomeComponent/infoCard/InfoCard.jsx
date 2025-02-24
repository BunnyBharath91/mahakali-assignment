
import { Box, Paper, Stack, Typography } from "@mui/material";

const InfoCard = ({ cardTitle, minWidth, minHeight, userDetails }) => {
  return (
    <Paper sx={{minWidth:minWidth ,minHeight:minHeight,boxShadow:5,borderRadius:"10px",p:2}}>
        <Stack spacing={1}>
            <Typography variant="h5" sx={{fontWeight:"bold",color:"primary.main"}}>{userDetails?.name}</Typography>
            <Typography sx={{fontSize:"18px"}}> <Typography component='span' sx={{color:"text.secondary"}} >Email: </Typography> {userDetails?.email}</Typography>
            <Typography sx={{fontSize:"18px"}}><Typography component='span' sx={{color:"text.secondary"}} >Mobile: </Typography>{userDetails?.phone}</Typography>
            <Typography sx={{fontSize:"18px"}}><Typography component='span' sx={{color:"text.secondary"}}>Registration Date: </Typography>{userDetails?.registerDate}</Typography>
        </Stack>
    </Paper>
  );
};

export default InfoCard;
