export interface Ticket {
    arrival_time: string;
    available_tickets: number;
    createdAt?: string;
    departure_time: string;
    flight_number: string;
    from: string;
    id: string;
    price: number;
    to: string;
    updatedAt?: string;
  }
  

  export interface TicketCardProps {
    tickets: Array<Array<Ticket>>; 
    ticketType: string; 
  }