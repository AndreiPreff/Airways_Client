import { FC } from "react";

import Header from "Airways_Common/components/header";
import FlightsRoutes from "./flights.routes";

const FlightsPage: FC = () => {
  return (
    <>
      <Header isAdmin={false} />
      <FlightsRoutes />
    </>
  );
};

export default FlightsPage;
