import React from 'react';
import './App.scss';
import Simulations from './Simulations/Simulations';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import About from './About';
import SiteLayout from './Simulations/SiteLayout';
import Expenses from './Expenses/Expenses';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/a-propos" element={<About />} />
          <Route path="/" element={<Simulations />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
