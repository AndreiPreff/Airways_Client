export interface OrderDataItem {
  flightIdThere: string[]| null;
  flightIdBack?: string[]| null;
  passengerName: string;
  passengerLastName: string;
  passengerPassportNumber: string;
}