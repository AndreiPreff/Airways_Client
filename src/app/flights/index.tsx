import React, { FC } from "react";


import FlightsRoutes from "./flights.routes";
import Header from "components/header";

const FlightsPage: FC = () => {
  return (
    <><Header pages={['Orders', 'History']} isAdmin={false} />
      <FlightsRoutes />
    </>
  );
};

export default FlightsPage;
