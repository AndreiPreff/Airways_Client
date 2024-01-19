import React, { FC } from "react";
import Header from "components/header";
import OrdersRoutes from "./orders.routes";

const OrdersPage: FC = () => {
  return (
    <><Header pages={['Orders', 'Orders/History']} isAdmin={false} />
      <OrdersRoutes />
    </>
  );
};

export default OrdersPage;
