import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const ShopPage = React.lazy(() => import('app/shop/shop.page'));

const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={ShopPage} />} />
    </Routes>
  );
};

export default UsersRoutes;
