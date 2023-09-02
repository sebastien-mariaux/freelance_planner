import React from "react";
import "./App.scss";
import Simulations from "./Simulations/Simulations";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import SiteLayout from "./SiteLayout";
import Accounting from "./Accounting/Accounting";
import { ErrorBoundary } from "react-error-boundary";
import MainFallbackError from "./errors/MainFallbackError";
import Login from "./Access/Login";
import WithAuth from "./Access/WithAuth";
import Companies from "./Companies/Companies";
import Feedback from "./Feedback/Feedback.jsx";
import Profile from "./Profile/Profile";
import Restricted from "./Access/Restricted";
import Subscription from "./Access/Subscription";
import Signup from "./Access/Signup";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={MainFallbackError}
      onError={(error, componentStack) => {
        console.log("error", error);
        console.log("componentStack", componentStack);
      }}
    >
      <Router>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route element={<WithAuth />}>
              <Route path="/" element={<Companies />} />
              <Route path="/companies" element={<Companies />} />
              <Route
                path="/companies/:companyId/simulations"
                element={<Simulations />}
              />
              <Route element={<Restricted />}>
                <Route path="/companies/:companyId/accounting" element={<Accounting />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscribe" element={<Subscription />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
