import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';

import { selectAvailableTickets } from 'app/flights/store/flights.selectors';
import { selectOrdersError, selectOrdersPending } from './store/orders.selectors';
import { fetchAllUserOrders, fetchOrderTickets } from './store/orders.actions';


const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const availableTickets = useSelector(selectAvailableTickets);
  const pending = useSelector(selectOrdersPending);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    // Здесь вы можете вызвать ваш thunk для получения доступных билетов
    dispatch(fetchAllUserOrders());
  }, [dispatch]);

  const handleBuyTickets = () => {
    // Здесь вы можете вызвать ваш thunk для покупки билетов
    // Не забудьте передать необходимые данные для покупки (например, ID выбранных билетов)
    dispatch(orderTickets(/* передайте необходимые данные для покупки */));
  };

  if (pending) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Available Tickets</Typography>
      {availableTickets && availableTickets.length > 0 ? (
        availableTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent>
              <Typography variant="h6">{/* Выведите нужные данные билета */}</Typography>
              {/* Дополнительная информация о билете */}
            </CardContent>
            <Button onClick={handleBuyTickets} variant="contained" color="primary">
              Buy
            </Button>
          </Card>
        ))
      ) : (
        <Typography>No available tickets</Typography>
      )}
    </div>
  );
};

export default OrdersPage;
