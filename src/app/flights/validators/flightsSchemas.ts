import * as yup from "yup";



export const passengerSchema = yup.object().shape({
  passengerName: yup.string().required('Required field!').min(2, "Min 2 symbols"),
  passengerLastName: yup.string().required('Required field!').min(2, "Min 2 symbols"),
  passengerPassportNumber: yup
    .string()
    .required('Required field')
    .matches(/^[0-9a-zA-Z]{5,}$/, 'Passport Number incorrect'),
});

export const flightschema = yup.object().shape({
  departureCity: yup.string().required('Departure City is required'),
  arrivalCity: yup.string().required('Arrival City is required'),
  departureDate: yup.string().required('Departure Date is required'),
  returnDate: yup.string().when('roundTrip', {
    is: true,
    then: yup.string().required('Return Date is required'),
  }),
  passengerCount: yup
    .number()
    .required('Passenger Count is required')
    .min(0, 'Passenger Count must be at least 0')
    .integer('Passenger Count must be an integer'),
  transfers: yup.number().required('Transfers is required').min(0, 'Transfers must be at least 0').integer('Transfers must be an integer'),
});

