import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home
 from './pages/Home';
function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
