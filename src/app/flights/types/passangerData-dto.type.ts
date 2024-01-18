export interface PassengerFormData {
    passengerName: string;
    passengerLastName: string;
    passengerPassportNumber: string;
  }

export interface PassengerFormProps {
    passengerNumber: number;
    onInputChange: (data: PassengerFormData) => void;
  }