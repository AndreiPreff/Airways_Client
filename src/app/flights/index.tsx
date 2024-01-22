import React, { FC } from "react";


import FlightsRoutes from "./flights.routes";
import Header from "Airways_Common/components/header";


const FlightsPage: FC = () => {
  return (
    <><Header pages={['Orders', 'Orders/History']} isAdmin={false} />
      <FlightsRoutes />
    </>
  );
};

export default FlightsPage;
