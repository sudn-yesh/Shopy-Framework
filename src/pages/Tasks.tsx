import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1e1e2f',
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#2e2e3f',
  color: '#fff',
  margin: '10px 0',
  padding: '10px 20px',
  borderRadius: '10px',
}));

const IconStyled = styled('div')(({ theme }) => ({
  marginRight: '10px',
}));

const PendingStyled = styled('div')(({ theme }) => ({
  color: 'gray',
}));

const Tasks: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogStyled open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h6" style={{ color: '#fff' }}>Tasks List</Typography>
      </DialogTitle>
      <DialogContent>
        <ButtonStyled>
          <div>
            <IconStyled>
              <TelegramIcon />
            </IconStyled>
            Follow us
          </div>
          <PendingStyled>Pending</PendingStyled>
        </ButtonStyled>
        <ButtonStyled>
          <div>
            <IconStyled>
              <TelegramIcon />
            </IconStyled>
            Follow us
          </div>
          <PendingStyled>Pending</PendingStyled>
        </ButtonStyled>
        <ButtonStyled>
          <div>
            <IconStyled>
              <TwitterIcon />
            </IconStyled>
            Follow us
          </div>
          <PendingStyled>Pending</PendingStyled>
        </ButtonStyled>
        <ButtonStyled>
          <div>
            <IconStyled>
              <YouTubeIcon />
            </IconStyled>
            Follow us
          </div>
          <PendingStyled>Pending</PendingStyled>
        </ButtonStyled>
      </DialogContent>
    </DialogStyled>
  );
};

export default Tasks;
