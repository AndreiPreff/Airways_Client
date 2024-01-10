import Header from "components/header";
import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch } from "react-redux";
import { fetchAvailableTickets } from "./store/flights.actions";
import { useNavigate } from "react-router-dom";
import { selectPassengerCount } from "./store/flights.slice";


const FlightsPage = () => {
  const navigation = useNavigate();
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [roundTrip, setRoundTrip] = useState(false);
  const [transfers, setTransfers] = useState(0);
  const cities = ['Minsk', 'Warsaw', 'Moscow', 'Kyiv', 'Prague', 'Amsterdam', 'London', 'Paris', 'Madrid', 'Milan', 'Istanbul', 'Vienna'];
  const dispatch = useDispatch();


  const handleDepartureCityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDepartureCity(event.target.value);
  };

  const handleArrivalCityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setArrivalCity(event.target.value);
  };

  const handleDepartureDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDepartureDate(event.target.value);
  };

  const handleReturnDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setReturnDate(event.target.value);
  };

  const handlePassengerCountChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassengerCount(event.target.value);
    dispatch<any>(selectPassengerCount(event.target.value));
  };

  const handleRoundTripChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setRoundTrip(event.target.checked);
  };

  const handleTransfersChange = (event: SelectChangeEvent<number>) => {
    setTransfers(Number(event.target.value));
  };

  const handleBookFlight = () => {
   
    const formData = {
      from: departureCity,
      to: arrivalCity,
      departureDate:`${departureDate}T00:00:00.000Z`,
      maxStops:transfers,
      roundTrip,
      returnDate: returnDate ? `${returnDate}T00:00:00.000Z` : null,
      ticketsAmount: Number(passengerCount),
      };

    dispatch<any>(fetchAvailableTickets(formData));
    navigation("/flights/choice")
  };


  return (
    <>
      <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={10} md={8} lg={3} xl={3}>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
          <form>
            <FormControl fullWidth>
              <InputLabel id="departure-city-label">Departure City</InputLabel>
              <Select
                sx={{ width: "100%", mb: 2 }}
                labelId="departure-city-label"
                id="departure-city"
                value={departureCity}
                onChange={handleDepartureCityChange}
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="arrival-city-label">Arrival City</InputLabel>
              <Select
                sx={{ width: "100%", mb: 2 }}
                labelId="arrival-city-label"
                id="arrival-city"
                value={arrivalCity}
                onChange={handleArrivalCityChange}
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="departure-date"
              label="Departure Date"
              type="date"
              value={departureDate}
              onChange={handleDepartureDateChange}
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
                value={returnDate}
                onChange={handleReturnDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={roundTrip}
                  onChange={handleRoundTripChange}
                  name="roundTrip"
                  color="primary"
                />
              }
              label="Round Trip"
            />

            <FormControl fullWidth>
              <InputLabel id="transfers-label">Transfers</InputLabel>
              <Select
                sx={{ width: "100%", mb: 2, mt: 2 }}
                labelId="transfers-label"
                id="transfers"
                value={transfers}
                onChange={handleTransfersChange}
              >
                <MenuItem value={0}>0 Transfers</MenuItem>
                <MenuItem value={1}>1 Transfer</MenuItem>
                <MenuItem value={2}>2 Transfers</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="passenger-count"
                type="number"
                label="Passenger Count"
                sx={{ width: '100%', mb: 2 }}
                value={passengerCount}
                onChange={handlePassengerCountChange}
                inputProps={{ min: 0, max: 100 }}
              />
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleBookFlight}>
              Book Flight
            </Button>
          </form></Grid></Grid></>
  );
};

export default FlightsPage;

