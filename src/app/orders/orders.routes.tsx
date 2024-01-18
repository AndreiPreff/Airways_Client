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
const FlightChoicePage = React.lazy(() => import('app/flights/flightsChoice.page'));

const FlightsRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={FlightsPage} />} />
      <Route path="/choice" element={<Suspended element={FlightChoicePage} />} />
    </Routes>
  );
};

export default FlightsRoutes;
