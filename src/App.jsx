import React from "react";
import "./App.scss";
import Simulations from "./Simulations/Simulations";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import SiteLayout from "./Simulations/SiteLayout";
import Achieved from "./Achieved/Achieved";
import { ErrorBoundary } from "react-error-boundary";
import MainFallbackError from "./errors/MainFallbackError";
import Login from "./Login/Login";
import WithAuth from "./Login/WithAuth";
import Companies from "./Companies/Companies";
import Feedback from "./Feedback/Feedback.jsx";

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
            <Route path="/a-propos" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route element={<WithAuth />}>
              <Route path="/" element={<Companies />} />
              <Route path="/companies" element={<Companies />} />
              <Route
                path="/companies/:companyId/simulations"
                element={<Simulations />}
              />
              <Route path="/companies/:companyId/achieved" element={<Achieved />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
