import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { BODY_PAGE_HOME, BUTTON_LBLCOMENZAR, TITLE_PAGE_HOME_WELCOME } from '../../constants';

function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        {TITLE_PAGE_HOME_WELCOME}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {BODY_PAGE_HOME}
      </Typography>
      <Button variant="contained" color="primary">
        {BUTTON_LBLCOMENZAR}
      </Button>
    </Container>
  );
}

export default Home;