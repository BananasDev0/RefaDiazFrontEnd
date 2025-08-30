import React from 'react';
import { Box, Typography } from '@mui/material';

interface AccessorySpecificFieldsProps {
  isReadOnly: boolean;
}

const AccessorySpecificFields: React.FC<AccessorySpecificFieldsProps> = ({ isReadOnly }) => {
  return (
    <Box>
      <Typography variant="h6">Accessory Specific Fields</Typography>
      <Typography>isReadOnly: {isReadOnly ? 'Yes' : 'No'}</Typography>
      {/* Specific fields for Accessories will go here */}
    </Box>
  );
};

export default AccessorySpecificFields;
