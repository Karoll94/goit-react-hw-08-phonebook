import React from 'react';
import Contacts from './Contacts/Contacts';
import { useSelector } from 'react-redux';
import Navigation from './Navigation/Navigation';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
export const App = () => {
  const user = useSelector(state => state.store.token);

  return (
    
    <Router>
      <Switch>
        <Route path="/register">
          {!user ? <Navigation /> : <Redirect to="/contacts" />}
        </Route>
        <Route path="/login">
          {!user ? <Navigation /> : <Redirect to="/contacts" />}
        </Route>
        <Route path="/contacts">
          {user ? <Contacts /> : <Redirect to="/register" />}
        </Route>
        <Redirect from="/" to="/contacts" />
      </Switch>
    </Router>
  );
};
