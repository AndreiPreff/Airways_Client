import React from "react";
import AuthenticationRoutes from "./auth.routes";
import Header from "components/header";

const SignPage: React.FC = () => {
  return (
    <><Header pages={['Orders', 'Orders/History']} isAdmin={false} />
      <AuthenticationRoutes />
    </>
  );
  
};

export default SignPage;