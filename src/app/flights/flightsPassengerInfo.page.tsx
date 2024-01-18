import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFlightsError, selectFlightsPassengerCount, selectSelectedTicket } from './store/flights.selectors';
import PassengerForm from './components/passengerForm';
import { PassengerFormData } from './types/passangerData-dto.type';
import { orderTickets } from './store/flights.actions';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const PassengerPage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTickets = useSelector(selectSelectedTicket);
  const selectedFlightsPassengerCount = useSelector(selectFlightsPassengerCount);
  const navigation = useNavigate();
  const [passengersData, setPassengersData] = useState<Array<{ [key: string]: string }>>([]);
  const selectedFlightsError = useSelector(selectFlightsError);

  useEffect(() => {
    if (selectedFlightsError === "Unauthorized") navigation('/auth/sign-in');
  }, [selectedFlightsError, navigation]);

  const handleInputChange = (index: number, data: PassengerFormData) => {
    const newPassengersData = [...passengersData];
    newPassengersData[index] = {
      ...newPassengersData[index],
      ...data,
    };
    setPassengersData(newPassengersData);
  };

  const handleOrderTickets = () => {
    const passengersDataArray: Array<{
      flightIdThere: string[] | null;
      flightIdBack: string[] | null;
      passengerName: string;
      passengerLastName: string;
      passengerPassportNumber: string;
    }> = [];

    for (let i = 0; i < (selectedFlightsPassengerCount ? selectedFlightsPassengerCount : 0); i++) {
      passengersDataArray.push({
        flightIdThere: selectedTickets.there ? selectedTickets.there.map((ticket) => ticket.id) : null,
        flightIdBack: selectedTickets.back ? selectedTickets.back.map((ticket) => ticket.id) : null,
        passengerName: passengersData[i]?.passengerName,
        passengerLastName: passengersData[i]?.passengerLastName,
        passengerPassportNumber: passengersData[i]?.passengerPassportNumber,
      });
    }
    dispatch<any>(orderTickets(passengersDataArray));
  };

  return (
    <div>
      <Typography variant="h2">
        Passenger Information
      </Typography>
      {selectedFlightsPassengerCount &&
        Array.from({ length: selectedFlightsPassengerCount }, (_, index) => (
          <PassengerForm
            key={index}
            passengerNumber={index + 1}
            onInputChange={(data: PassengerFormData) => handleInputChange(index, data)}
          />
        ))
      }
      <Button onClick={handleOrderTickets} variant="contained" color="secondary">Order Tickets</Button>
    </div>
  );
};

export default PassengerPage;
