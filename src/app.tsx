import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import ErrorBoundaryComp from "components/error-boundary.comp";
import AppRoutes from "app.routes";

import './app.css';
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
