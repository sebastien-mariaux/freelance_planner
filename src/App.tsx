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
import Achieved from './Achieved/Achieved';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/a-propos" element={<About />} />
          <Route path="/" element={<Simulations />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/achieved" element={<Achieved />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
