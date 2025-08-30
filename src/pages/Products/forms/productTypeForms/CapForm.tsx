import React from 'react';
import { Box, Typography } from '@mui/material';

interface CapSpecificFieldsProps {
  isReadOnly: boolean;
}

const CapSpecificFields: React.FC<CapSpecificFieldsProps> = ({ isReadOnly }) => {
  return (
    <Box>
      <Typography variant="h6">Cap Specific Fields</Typography>
      <Typography>isReadOnly: {isReadOnly ? 'Yes' : 'No'}</Typography>
      {/* Specific fields for Caps will go here */}
    </Box>
  );
};

export default CapSpecificFields;
