import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FeedBackForm({open, handleFeedbackFormClose}) {

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleFeedbackFormClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send us feedback, please enter your email address and message below. We will get back to you as soon as possible.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your feedback:"
            type="feedback"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackFormClose}>Cancel</Button>
          <Button onClick={handleFeedbackFormClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}