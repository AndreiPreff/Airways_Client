import { Ticket } from "./ticket-dto.type";

export interface SelectedTicketCardProps {
    tickets: Array<Ticket>;
    ticketType: string;
    onDeselect: () => void;
  }