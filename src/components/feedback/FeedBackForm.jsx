import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FeedBackForm({open, handleFeedbackFormClose, handleFeedbackFormSubmit}) {

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleFeedbackFormClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To send us feedback, please enter your email address and message below. We will get back to you as soon as possible.
            </DialogContentText>
            <form action="/" method="POST" onSubmit={handleFeedbackFormSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="feedback"
                    label="Your feedback"
                    type="feedback"
                    fullWidth
                    variant="standard"
                />
                <DialogActions>
                    <Button onClick={handleFeedbackFormClose}>Cancel</Button>
                    <Button type="submit" label="Submit">Send</Button>
                </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}