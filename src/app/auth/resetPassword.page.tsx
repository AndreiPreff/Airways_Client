import React, { useState } from 'react';
import { useForm, Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, TextField, InputAdornment, IconButton, Typography, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'app/auth/store/auth.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetSchema } from "./validators/authSchemas";
import { authResetPasswordErrorSelector } from './store/auth.selectors';



const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(resetSchema),
    defaultValues: { email: "", password: "",confirmPassword:"" },
  });
  const authError = useSelector(authResetPasswordErrorSelector);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch<any>(resetPassword(data));
  };

  return (
    <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={10} md={8} lg={3} xl={3}>
        <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", mb: 2 }}
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", mb: 2 }}
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", mb: 2 }}
              {...field}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {authError && (
          <Typography color="error" variant="body2" gutterBottom>
            {authError}
          </Typography>
        )}

        <Button sx={{  mb: 2 }} type="submit" variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
      </form>
      </Grid>
      </Grid>

  );
};

export default ResetPasswordPage;
