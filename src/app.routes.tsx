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
const SignInPage = React.lazy(() => import('app/auth/signIn.page'));
const SignUpPage = React.lazy(() => import('app/auth/signUp.page'));


const AppRoutes = () => {
  return (
    <Routes>
      {/* PRIVATE */}
  

      {/* PUBLIC */}
      <Route path={'/shop/*'} element={<PublicRoute element={ShopPage} />} />
      <Route
        path={'/sign-up/*'}
        element={<PublicRoute element={SignUpPage} />}
      />
      <Route
        path={'/sign-in/*'}
        element={<PublicRoute element={SignInPage} />}
      />

    
    

      {/* DEFAULT */}

      <Route path="*" element={<Navigate to="/shop" />} />
    </Routes>
  );
};

export default AppRoutes;
