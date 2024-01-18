import { Ticket } from "./ticket-dto.type";

export interface FlightsState {
    availableTickets: {
      data: {
        there: Array<Array<Ticket>>;
        back: Array<Array<Ticket>>;
      };
    } | null;
    selectedTickets: {
      there: Array<Ticket> | null;
      back: Array<Ticket> | null;
    };
    pending: boolean;
    error: string | null;
    passengerCount: number | null;
  }
  