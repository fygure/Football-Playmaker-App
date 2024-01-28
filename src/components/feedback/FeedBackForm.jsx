import React, { useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import emailjs from '@emailjs/browser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function FeedBackForm(props) {

  const {
    open,
    handleFeedbackFormClose,
    handleFeedbackFormSubmit,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    setSnackbarMessage,
    snackbarSeverity,
    setSnackbarSeverity,
  } = props;

  const form = useRef();

  const sendFeedback = (e) => {
    e.preventDefault();

    const email = form.current['from_email'].value;
    const message = form.current['message'].value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !message) {
      setSnackbarMessage('Both fields are required!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setSnackbarMessage('Invalid email format!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (sessionStorage.getItem('feedbackSent')) {
      setSnackbarMessage('You have already sent feedback in this session!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_USER_ID) {
      console.error('Environment variables are not defined!');
      setSnackbarMessage('Failed to send feedback due to server error!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    emailjs.sendForm(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.EMAILJS_USER_ID
    )
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setSnackbarMessage('Feedback sent successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        sessionStorage.setItem('feedbackSent', 'true');
        handleFeedbackFormClose();
      }, (error) => {
        console.log('FAILED...', error);
        setSnackbarMessage('Failed to send feedback!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });

  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };


  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleFeedbackFormClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send us feedback, please enter your email address and message below. We will get back to you as soon as possible.
          </DialogContentText>
          <form ref={form} action="/" method="POST" onSubmit={sendFeedback}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email address"
              type="email"
              fullWidth
              variant="standard"
              name="from_email"
            />
            <TextField
              autoFocus
              margin="dense"
              id="feedback"
              label="Your feedback"
              type="feedback"
              fullWidth
              variant="standard"
              name="message"
            />
            <DialogActions>
              <Button onClick={handleFeedbackFormClose}>Cancel</Button>
              <Button type="submit" label="Submit">Send</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}