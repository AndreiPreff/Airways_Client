import { Card, CardContent, Button, Typography } from '@mui/material';
import { SelectedTicketCardProps } from '../types/ticketCard-dto.type';


const SelectedTicketCard: React.FC<SelectedTicketCardProps>  = ({ tickets, ticketType, onDeselect }) => {
  const handleDeselect = () => {
 
    onDeselect();
  };
  

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Selected {ticketType} Tickets
          </Typography>
          {tickets.map((ticket, index) => (
            <div key={index}>
              <Typography color="text.secondary">
                Flight from {ticket.from} to {ticket.to}
              </Typography>
              <Typography color="text.secondary">
                Departure Time: {ticket.departure_time}
              </Typography>
              <Typography color="text.secondary">
                Arrival Time: {ticket.arrival_time}
              </Typography>
              <Typography color="text.secondary">
                Price: ${ticket.price}
              </Typography>
              {index < tickets.length - 1 && (
                <Typography color="text.secondary">
                  Transfer in: {ticket.to}
                </Typography>
              )}
            </div>
          ))}
        </CardContent>
        <Button onClick={handleDeselect} variant="outlined">
          Deselect
        </Button>
      </Card>
    </div>
  );
};

export default SelectedTicketCard;
