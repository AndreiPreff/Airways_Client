import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const FlightsPage = React.lazy(() => import('app/flights/flightsSearch.page'));
const FlightChoisePage = React.lazy(() => import('app/flights/flightsChoise.page'));

const FlightsRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={FlightsPage} />} />
      <Route path="/choise" element={<Suspended element={FlightChoisePage} />} />
    </Routes>
  );
};

export default FlightsRoutes;
