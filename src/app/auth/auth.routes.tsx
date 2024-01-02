import React, { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

const SignInPage = React.lazy(() => import("app/auth/signIn.page"));
const SignUpPage = React.lazy(() => import("app/auth/signUp.page"));
const ResetPasswordPage = React.lazy(() => import("app/auth/resetPassword.page"));


const AuthenticationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<Suspended element={SignInPage} />} />
      <Route path="/sign-up" element={<Suspended element={SignUpPage} />} />
      <Route path="/reset-password" element={<Suspended element={ResetPasswordPage} />} />
     
    </Routes>
  );
};

export default AuthenticationRoutes;