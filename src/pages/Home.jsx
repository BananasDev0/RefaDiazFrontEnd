import React from 'react';
import { Container, } from '@mui/material';
import {  } from '../../constants';
import { MainStructure } from '../components/MainStructure';

function Home() {

  

  return (
    <Container 
    maxWidth={false}
    disableGutters={true}
    
    >
      
      <MainStructure/>
    </Container>
  );
}

export default Home;