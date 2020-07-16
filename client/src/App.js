// React
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux & Utils
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Error Handlers
import Spinner from "./components/layout/Spinner";
import ErrorBoundary from "./components/layout/ErrorBoundary";

// Global CSS
import "./App.css";

// My React Components
const Navbar = lazy(() => import("./components/layout/Navbar"));
const Landing = lazy(() => import("./components/layout/Landing"));
const Routes = lazy(() => import("./components/routing/Routes"));

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
