import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DemoPage from './containers/Screen';
import DashboardPage from './containers/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#25f8cb'
          },
          secondary: { main: '#d2f0f4' },
          error: {
            main: '#dc3023'
          },
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={`/`} exact component={DashboardPage} />
          <Route path={`/preview`} component={DemoPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
export default App;
