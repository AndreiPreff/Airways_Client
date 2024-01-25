import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAvailableTickets } from "./store/flights.actions";
import { FormValues } from "./types/formValues-dto.type";
import { flightschema } from "./validators/flightsSchemas";
import { selectPassengerCount } from "./store/flights.slice";

const cities = [
  "Minsk",
  "Warsaw",
  "Moscow",
  "Kyiv",
  "Prague",
  "Amsterdam",
  "London",
  "Paris",
  "Madrid",
  "Milan",
  "Istanbul",
  "Vienna",
];

const FlightsPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(flightschema),
  });

  const [roundTrip, setRoundTrip] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = {
      from: data.departureCity,
      to: data.arrivalCity,
      departureDate: `${data.departureDate}T00:00:00.000Z`,
      maxStops: data.transfers,
      roundTrip: roundTrip,
      returnDate: data.returnDate ? `${data.returnDate}T00:00:00.000Z` : null,
      ticketsAmount: Number(data.passengerCount),
    };

    dispatch<any>(selectPassengerCount(data.passengerCount));
    dispatch<any>(fetchAvailableTickets(formData));
    navigation("/flights/choice");
  };

  return (
    <>
      <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={10} md={8} lg={3} xl={3}>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <InputLabel id="departure-city-label">Departure City</InputLabel>
              <Controller
                name="departureCity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Select
                      sx={{ width: "100%", mb: 2 }}
                      labelId="departure-city-label"
                      id="departure-city"
                      {...field}
                    >
                      {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.departureCity && (
                      <Typography
                        color="error"
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        {errors.departureCity.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="arrival-city-label">Arrival City</InputLabel>
              <Controller
                name="arrivalCity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Select
                      sx={{ width: "100%", mb: 2 }}
                      labelId="arrival-city-label"
                      id="arrival-city"
                      {...field}
                    >
                      {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.arrivalCity && (
                      <Typography
                        color="error"
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        {errors.arrivalCity.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </FormControl>

            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="departure-date"
              label="Departure Date"
              type="date"
              {...register("departureDate")}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {roundTrip && (
              <TextField
                sx={{ width: "100%", mb: 2 }}
                id="return-date"
                label="Return Date"
                type="date"
                {...register("returnDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={roundTrip}
                  onChange={(e) => setRoundTrip(e.target.checked)}
                  name="roundTrip"
                  color="primary"
                />
              }
              label="Round Trip"
            />

            <FormControl fullWidth>
              <InputLabel id="transfers-label">Transfers</InputLabel>
              <Controller
                name="transfers"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <>
                    <Select
                      sx={{ width: "100%", mb: 2, mt: 2 }}
                      labelId="transfers-label"
                      id="transfers"
                      {...field}
                    >
                      <MenuItem value={0}>0 Transfers</MenuItem>
                      <MenuItem value={1}>1 Transfer</MenuItem>
                      <MenuItem value={2}>2 Transfers</MenuItem>
                    </Select>
                    {errors.transfers && (
                      <Typography
                        color="error"
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        {errors.transfers.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="passenger-count"
                type="number"
                label="Passenger Count"
                sx={{ width: "100%", mb: 2 }}
                {...register("passengerCount")}
                inputProps={{ min: 0, max: 100 }}
              />
              {errors.passengerCount && (
                <Typography
                  color="error"
                  sx={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {errors.passengerCount.message}
                </Typography>
              )}
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Book Flight
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default FlightsPage;
