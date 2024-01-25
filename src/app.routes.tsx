import SuspenseComponent from "components/suspense";
import React, { FC, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return localStorage.getItem('access_token') ? (
    <Suspense fallback={<SuspenseComponent />}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={""} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<SuspenseComponent />}>
    <Element />
  </Suspense>
);

const FlightsPage = React.lazy(() => import("app/flights"));
const SignPage = React.lazy(() => import("./Airways_Common/components/auth"));
const OrdersPage = React.lazy(() => import("app/orders"));

const AppRoutes = () => {
  return (
    <Routes>
<<<<<<< HEAD
      
  
=======
      {/* PRIVATE */}
>>>>>>> 8dc12ce (chat updating)

      {/* PUBLIC */}
      <Route
        path={"/flights/*"}
        element={<PublicRoute element={FlightsPage} />}
      />
<<<<<<< HEAD
      {/* PRIVATE */}
       <Route
        path={'/orders/*'}
        element={<PrivateRoute element={OrdersPage} />}
=======
      <Route path={"/auth/*"} element={<PublicRoute element={SignPage} />} />
      <Route
        path={"/orders/*"}
        element={<PublicRoute element={OrdersPage} />}
>>>>>>> 8dc12ce (chat updating)
      />

      {/* DEFAULT */}

      <Route path="*" element={<Navigate to="/flights" />} />
    </Routes>
  );
};

export default AppRoutes;
