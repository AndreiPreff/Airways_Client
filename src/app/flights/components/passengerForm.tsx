import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { passengerSchema } from '../validators/flightsSchemas';
import { PassengerFormData, PassengerFormProps } from '../types/passangerData-dto.type';


const PassengerForm: React.FC<PassengerFormProps> = ({ passengerNumber, onInputChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: yupResolver(passengerSchema),
    defaultValues: {
      passengerName: '',
      passengerLastName: '',
      passengerPassportNumber: '',
    },
  });

  const onSubmit: SubmitHandler<PassengerFormData> = (data) => {
    onInputChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h5" component="h3">
          Passenger {passengerNumber}
        </Typography>
        <Controller
          name="passengerName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder="Name"
              error={!!errors.passengerName}
              helperText={errors.passengerName?.message}
            />
          )}
        />

        <Controller
          name="passengerLastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder="Last Name"
              error={!!errors.passengerLastName}
              helperText={errors.passengerLastName?.message}
            />
          )}
        />

        <Controller
          name="passengerPassportNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder="Passport Number"
              error={!!errors.passengerPassportNumber}
              helperText={errors.passengerPassportNumber?.message}
            />
          )}
        />
      </Box>

      <Button type="submit">CONFIRM</Button>
    </form>
  );
};

export default PassengerForm;
