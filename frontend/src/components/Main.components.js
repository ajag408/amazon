import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


const Main = () => (
  <Switch>
    {/* <Route exact path="/" component={Home} /> */}
    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
  </Switch>
);

export default Main;
