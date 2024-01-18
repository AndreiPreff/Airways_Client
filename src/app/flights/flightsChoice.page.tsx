import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { selectTicket } from './store/flights.slice';
import { selectAvailableTickets, selectSelectedBackTicket, selectSelectedThereTicket } from './store/flights.selectors';
import { fetchAvailableTicketsSortedByPrice, fetchAvailableTicketsSortedByTime, } from './store/flights.actions';
import { SetStateAction, useState } from 'react';
import TicketCard from './components/ticketCard';
import SelectedTicketCard from './components/selectedTicketCard';
import { useNavigate } from 'react-router-dom';
const FlightChoicePage = () => {
    const dispatch = useDispatch();
    const availableTickets = useSelector(selectAvailableTickets);
    const selectedThereTicket = useSelector(selectSelectedThereTicket);
    const selectedBackTicket = useSelector(selectSelectedBackTicket);
    const navigation = useNavigate();
    const [sortType, setSortType] = useState('price');

    const handleOrderTicket = () => {
        navigation('/flights/passenger-info');
    };

    const onDeselectTicket = (ticketType: string) => {
        dispatch(selectTicket({ ticketType, ticket: null }));
    };;

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortType(event.target.value);
    };
    const handleSortByPrice = () => {
        if (availableTickets) dispatch<any>(fetchAvailableTicketsSortedByPrice(availableTickets));
    };

    const handleSortByTime = () => {
        if (availableTickets) dispatch<any>(fetchAvailableTicketsSortedByTime(availableTickets));
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
                        <MenuItem value="price" onClick={handleSortByPrice}>Price</MenuItem>
                        <MenuItem value="time" onClick={handleSortByTime}>Time</MenuItem>
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
