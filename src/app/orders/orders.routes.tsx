import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};



const HistoryPage = React.lazy(() => import('app/orders/ordersHistory.page'));
const OrdersPage = React.lazy(() => import('app/orders/orders.page'));

const OrdersRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={OrdersPage} />} />
      <Route path="/history" element={<Suspended element={HistoryPage} />} />
    </Routes>
  );
};

export default OrdersRoutes;
