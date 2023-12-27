import SuspenseComponent from 'components/suspense';
import React, { FC, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';


const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem('access_token') ? (
    <Suspense fallback={<SuspenseComponent />}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={''} />
  );
};


const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<SuspenseComponent />}>
    <Element />
  </Suspense>
);


const ShopPage = React.lazy(() => import('app/shop'));


const AppRoutes = () => {
  return (
    <Routes>
      {/* PRIVATE */}
  

      {/* PUBLIC */}
      <Route path={'/shop/*'} element={<PublicRoute element={ShopPage} />} />
    
    

      {/* DEFAULT */}

      <Route path="*" element={<Navigate to="/shop" />} />
    </Routes>
  );
};

export default AppRoutes;
