import React, { useState } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Grid, IconButton } from '@mui/material';
import { TouchApp, FlashOn, BarChart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [tapCount, setTapCount] = useState(0);
  const [animations, setAnimations] = useState([]);
  const [points, setPoints] = useState(1000);

  const handleTap = () => {
    if (points > 0) {
      setTapCount(tapCount + 1);
      setPoints(points - 1);

      const newAnimation = { id: Date.now(), value: '+1' };
      setAnimations(prevAnimations => [...prevAnimations, newAnimation]);

      setTimeout(() => {
        setAnimations(prevAnimations => prevAnimations.filter(animation => animation.id !== newAnimation.id));
      }, 1000);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography visibility={false} variant="h6"></Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <img src="/Shopy_Logo-removebg.png" alt='shopy-logo' className="shop-icon" />
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Box className="phone-container" onClick={handleTap}>
            
            {animations.map(animation => (
              <div className="tap-animation" key={animation.id}>+{2}</div>
            ))}
            <img src="/shopumbrella.png" alt="Shop Awning" className="shop-awning-image" />
            <div className="phone">
              <div className="phone-screen">
                <div className="screen-content">
                  <motion.img
                    src="/Shopy_Logo-removebg.png"
                    alt="Shopy Logo"
                    className="logo"
                    animate={{ rotate: [0, -7, 7, 0] }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key={tapCount}
                  />
                  <Typography variant="h6" color="primary">{tapCount}</Typography>
                </div>
              </div>
            </div>
          </Box>
          <Box className="progress-bar" mt={2}>
            <Typography className='rank' variant="body1">Iron</Typography>
            <Box className="progress">
              <Box className="progress-fill" width={`${(points / 1000) * 100}%`}></Box>
            </Box>
            <Typography className='points-charge' variant="body2">{points} / 1000</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item>
              <IconButton>
                <img src="/icons8-task-64.png" alt="Tasks" className="task-icon" />
                <Typography variant="caption">Tasks</Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <img src="/Friends_logo.png" alt="Friends" className="friends-icon" />
                <Typography variant="caption">Friends</Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <TouchApp />
                <Typography variant="caption">Tap</Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FlashOn />
                <Typography variant="caption">Boost</Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <BarChart />
                <Typography variant="caption">Stats</Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
