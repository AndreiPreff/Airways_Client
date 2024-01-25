import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PassengerForm from "./components/passengerForm";
import { orderTickets } from "./store/flights.actions";
import {
  selectFlightsError,
  selectFlightsPassengerCount,
  selectSelectedTicket,
} from "./store/flights.selectors";
import { PassengerFormData } from "./types/passangerData-dto.type";
import ChatSwitchPage from "components/chatSwitch.comp";

const PassengerPage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTickets = useSelector(selectSelectedTicket);
  const selectedFlightsPassengerCount = useSelector(
    selectFlightsPassengerCount
  );
  console.log(selectedFlightsPassengerCount)
  const navigation = useNavigate();
  const [passengersData, setPassengersData] = useState<
    Array<{ [key: string]: string }>
  >([]);
  const selectedFlightsError = useSelector(selectFlightsError);

  useEffect(() => {
    if (selectedFlightsError === "Unauthorized") navigation("/auth/sign-in");
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

    for (
      let i = 0;
      i < (selectedFlightsPassengerCount ? selectedFlightsPassengerCount : 0);
      i++
    ) {
      passengersDataArray.push({
        flightIdThere: selectedTickets.there
          ? selectedTickets.there.map((ticket) => ticket.id)
          : null,
        flightIdBack: selectedTickets.back
          ? selectedTickets.back.map((ticket) => ticket.id)
          : null,
        passengerName: passengersData[i]?.passengerName,
        passengerLastName: passengersData[i]?.passengerLastName,
        passengerPassportNumber: passengersData[i]?.passengerPassportNumber,
      });
    }
    dispatch<any>(orderTickets(passengersDataArray));
    navigation("/orders/success");
  };

  return (
    <div>
      <Typography variant="h2">Passenger Information</Typography>
      {selectedFlightsPassengerCount &&
        Array.from({ length: selectedFlightsPassengerCount }, (_, index) => (
          <PassengerForm
            key={index}
            passengerNumber={index + 1}
            onInputChange={(data: PassengerFormData) =>
              handleInputChange(index, data)
            }
          />
        ))}
      <Button
        onClick={handleOrderTickets}
        variant="contained"
        color="secondary"
      >
        Order Tickets
      </Button>
      <ChatSwitchPage />
    </div>
  );
};

export default PassengerPage;
