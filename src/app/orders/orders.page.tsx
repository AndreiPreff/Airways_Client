import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { selectOrderTickets, selectOrdersError, selectOrdersPending, selectUserOrders } from './store/orders.selectors';
import { fetchBookedOrders, fetchUserOrders, markOrderAsPaid } from './store/orders.actions';

const OrdersPage: React.FC = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(selectOrderTickets);
    const pending = useSelector(selectOrdersPending);
    const error = useSelector(selectOrdersError);
    const handleBuyClick = async (orderId: string) => {
        await dispatch<any>(markOrderAsPaid(orderId));
        await dispatch<any>(fetchBookedOrders());
    };

    useEffect(() => {
        dispatch<any>(fetchBookedOrders());
    }, [dispatch]);

    if (pending) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <Typography variant="h4">My Orders</Typography>
            <Grid container spacing={2} sx={{ padding: '10px' }}>
                {userOrders && userOrders.length > 0 ? (
                    userOrders.map((order, orderIndex) => (
                        <Grid key={orderIndex} item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Order Total: {order.order.orderTotal}</Typography>
                                    {order.tickets && order.tickets.length > 0 ? (
                                        //исправить any
                                        order.tickets.map((ticket: any, ticketIndex: number) => (
                                            <div key={ticketIndex}>
                                                <Typography variant="subtitle1">Direction: {ticket.direction}</Typography>
                                                <Typography variant="subtitle1">Departure Time: {ticket.flight.departure_time}</Typography>
                                                <Typography variant="subtitle1">Arrival Time: {ticket.flight.arrival_time}</Typography>
                                                <Typography variant="subtitle1">Flight Number: {ticket.flight.flight_number}</Typography>
                                                <Typography variant="subtitle1">From: {ticket.flight.from}</Typography>
                                                <Typography variant="subtitle1">To: {ticket.flight.to}</Typography>
                                                <Typography variant="subtitle1">Passenger Last Name: {ticket.passengerLastName}</Typography>
                                                <Typography variant="subtitle1">Passenger Name: {ticket.passengerName}</Typography>
                                                <Typography variant="subtitle1">Passenger Passport Number: {ticket.passengerPassportNumber}</Typography>
                                                <Typography variant="subtitle1">Price: {ticket.price}</Typography>

                                            </div>

                                        ))
                                    ) : (
                                        <Typography>No tickets for this order</Typography>
                                    )}
                                    <Button onClick={() => handleBuyClick(order.order.id)} variant="contained" color="secondary">
                                        Buy
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                    ))
                ) : (
                    <Typography>No orders yet</Typography>
                )}
            </Grid>
        </div>
    );
};

export default OrdersPage;
