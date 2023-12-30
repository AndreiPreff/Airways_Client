import { NavLink, useNavigate } from "react-router-dom";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {authSignUpErrorSelector} from "./store/auth.selectors";
import { signUp } from "./store/auth.actions";
import { signUpSchema } from "./validators/authSchemas";

const SignUp = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(authSignUpErrorSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(signUpSchema),
    defaultValues: { email: "", password: "", first_name:"", last_name:""},
  });

  const signUpUser = async (values: FieldValues) => {
    const response = await dispatch<any>(signUp(values));
    if (response.meta.requestStatus === 'fulfilled') navigation("/user");
  };


  const submitForm: SubmitHandler<FieldValues> = (data) => {
    signUpUser(data);
  };
  return (
    <>

      <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={10} md={8} lg={3} xl={3}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box
              component="main"
              sx={{
                p: 2,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", m: 1 }}
              >
                REGISTRATION
              </Typography>
            </Box>
            {authError && (
              <Typography
                color="error.main"
                sx={{ fontSize: 16, fontWeight: "bold" }}
              >
                {authError}
              </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            {errors.first_name && (
              <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {errors.first_name.message}
              </Typography>
            )}
            <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%', mb: 2 }}
                    {...field}
                    label="First Name"
                    variant="outlined"
                  />
                )}
              />
              {errors.last_name && (
              <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {errors.last_name.message}
              </Typography>
            )}
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%', mb: 2 }}
                    {...field}
                    label="Last Name"
                    variant="outlined"
                  />
                )}
              />
                {errors.email && (
              <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {errors.email.message}
              </Typography>
            )}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mb: 2 }}
                    {...field}
                    label="email"
                    variant="outlined"
                  />
                )}
              />
              {errors.password && (
                <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {errors.password.message}
                </Typography>
              )}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mb: 2 }}
                    {...field}
                    label="password"
                    variant="outlined"
                    type="password"
                  />
                )}
              />

              <Button
                sx={{ width: "100%", mb: 2 }}
                data-testid="sign-up-button"
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => submitForm}
              >
                ENTER
              </Button>
            </Box>
            <Box sx={{ textAlign: "center" }}>
             
              <NavLink className="login--sign-up__link" to="/sign-in">
                LOGIN
              </NavLink>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
