import React from 'react';
import DemoPage from './containers/Screen';
import DashboardPage from './containers/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {
  return (
    <Router basename={process.env.NODE_ENV == 'production' ? '/rc-bullets' : ''}>
      <Switch>
        <Route path={`/`} exact component={DashboardPage} />
        <Route path={`preview`} component={DemoPage} />
      </Switch>
    </Router>
  );
};
export default App;
