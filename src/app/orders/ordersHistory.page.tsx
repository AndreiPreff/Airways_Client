import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { selectOrdersError, selectOrdersPending, selectUserOrders } from './store/orders.selectors';
import { cancelOrder, fetchAllUserOrders } from './store/orders.actions';
import SuspenseComponent from 'components/suspense';


const HistoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);
  const pending = useSelector(selectOrdersPending);
  const error = useSelector(selectOrdersError);
  console.log(userOrders)

  useEffect(() => {

    dispatch<any>(fetchAllUserOrders());
  }, [dispatch]);

  const handleCancelOrder = (orderId: string) => {
   
    dispatch<any>(cancelOrder(orderId));
  };

  if (pending) {
    return <SuspenseComponent />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Order History</Typography>
      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Typography variant="h6">{order.id}</Typography>
              {/* Дополнительная информация о заказе */}
            </CardContent>
            <Button onClick={() => handleCancelOrder(order.id)} variant="contained" color="secondary">
              Cancel
            </Button>
          </Card>
        ))
      ) : (
        <Typography>No order history</Typography>
      )}
    </div>
  );
};

export default HistoryPage;
