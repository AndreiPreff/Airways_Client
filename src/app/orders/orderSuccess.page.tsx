import React from 'react';
import { Typography, Box } from '@mui/material';

const OrderSuccessPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" align="center">
        Ticket is booked. Go to orders to buy it.
      </Typography>
    </Box>
  );
};

export default OrderSuccessPage;