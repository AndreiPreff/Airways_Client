import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { selectTicket } from './store/flights.slice';
import { selectAvailableTickets, selectFlightsPassengerCount, selectSelectedBackTicket, selectSelectedThereTicket, selectFlightsError } from './store/flights.selectors';
import { orderTickets } from './store/flights.actions';
import { SetStateAction, useEffect, useState } from 'react';
import TicketCard from './components/ticketCard';
import SelectedTicketCard from './components/selectedTicketCard';
import { useNavigate } from 'react-router-dom';
import { Ticket } from './types/ticket-dto.type';
import { OrderSelectedData } from './types/orderSelectedData-dto.type';

const FlightChoicePage = () => {
    const dispatch = useDispatch();
    const availableTickets = useSelector(selectAvailableTickets);
    const selectedThereTicket = useSelector(selectSelectedThereTicket);
    const selectedBackTicket = useSelector(selectSelectedBackTicket);
    const selectedFlightsPassengerCount = useSelector(selectFlightsPassengerCount);
    const navigation = useNavigate();
    const selectedFlightsError = useSelector(selectFlightsError);
    const [sortType, setSortType] = useState('price');
   
   
    useEffect(() => {
        if (selectedFlightsError === "Unauthorized") navigation('/auth/sign-in');
      }, [selectedFlightsError, navigation]);

    const handleOrderTicket =  () => {
        const orderData: OrderSelectedData[] = [];
        const addTicketsToOrderData = (tickets: Ticket[] | null) => {
            if (tickets) {
                tickets.forEach((ticket: Ticket) => {
                    orderData.push({
                        amount: Number(selectedFlightsPassengerCount),
                        flightId: ticket.id,
                    });
                });
            }
        };
        addTicketsToOrderData(selectedThereTicket);
        addTicketsToOrderData(selectedBackTicket);
        if (orderData.length > 0)  dispatch<any>(orderTickets(orderData))
        

    };

    const onDeselectTicket = (ticketType: string) => {
        dispatch(selectTicket({ ticketType, ticket: null }));
    };;

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortType(event.target.value);
    };

    return (
        <Grid container spacing={2} sx={{ padding: '10px' }}>
            {availableTickets ? (
                <> <Grid item xs={12}>
                    <InputLabel htmlFor="sort-select">Sort By:</InputLabel>
                    <Select
                        label="Sort By"
                        value={sortType}
                        onChange={handleSortChange}
                        inputProps={{
                            name: 'sort',
                            id: 'sort-select',
                        }}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="time">Time</MenuItem>
                    </Select>
                </Grid>
                    {availableTickets.there.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                                Available Tickets for there
                            </Typography>
                        </Grid>
                    )}
                    {availableTickets.there.map((ticket, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <TicketCard
                                tickets={[ticket]}
                                ticketType="there"
                            />
                        </Grid>
                    ))}
                    {availableTickets.back.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                                Available Tickets for back
                            </Typography>
                        </Grid>
                    )}
                    {availableTickets.back.map((ticket, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <TicketCard
                                tickets={[ticket]}
                                ticketType="back"
                            />
                        </Grid>
                    ))}
                </>
            ) : (
                <Grid item xs={12}>
                    <Typography>No available tickets</Typography>
                </Grid>
            )}
            {(selectedThereTicket || selectedBackTicket) && (
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Order
                    </Typography>
                </Grid>
            )}
            {selectedThereTicket && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SelectedTicketCard
                        tickets={selectedThereTicket}
                        ticketType="there"
                        onDeselect={() => onDeselectTicket("there")}
                    />
                </Grid>
            )}
            {selectedBackTicket && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SelectedTicketCard
                        tickets={selectedBackTicket}
                        ticketType="back"
                        onDeselect={() => onDeselectTicket("back")}
                    />
                </Grid>
            )}
            {(selectedThereTicket || selectedBackTicket) && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button onClick={handleOrderTicket} variant="contained" color="secondary">
                        Order
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default FlightChoicePage;
