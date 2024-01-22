import React, { FC } from "react";
import OrdersRoutes from "./orders.routes";
import Header from "Airways_Common/components/header";

const OrdersPage: FC = () => {
  return (
    <><Header pages={['Orders', 'Orders/History']} isAdmin={false} />
      <OrdersRoutes />
    </>
  );
};

export default OrdersPage;
