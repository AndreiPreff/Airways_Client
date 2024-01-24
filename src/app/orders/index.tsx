import Header from "Airways_Common/components/header";
import { FC } from "react";
import OrdersRoutes from "./orders.routes";

const OrdersPage: FC = () => {
  return (
    <>
      <Header isAdmin={false} />
      <OrdersRoutes />
    </>
  );
};

export default OrdersPage;
