import * as yup from "yup";



export const passengerSchema = yup.object().shape({
  passengerName: yup.string().required('Required field!').min(2, "Min 2 symbols"),
  passengerLastName: yup.string().required('Required field!').min(2, "Min 2 symbols"),
  passengerPassportNumber: yup
    .string()
    .required('Required field')
    .matches(/^[0-9a-zA-Z]{5,}$/, 'Passport Number incorrect'),
});

