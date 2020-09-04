import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ConnectedRouter } from 'connected-react-router';
import {
  Switch,
  Route,
} from "react-router-dom";

import Main from './Main';
import Register from './Register';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Message from './Message';
import { loadConfig } from './configSlice';
import { history } from './store';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  }
});

function App({
  darkMode,
  loadConfig,
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    loadConfig({ prefersDarkMode });
    // fix: clean hash, to make Dialog state sync with url hash state.
    // from: https://stackoverflow.com/a/49373716/7499223
    window.history.replaceState(null, null, ' ');
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </ConnectedRouter>
      <Message />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.config.darkMode,
});

const mapDispatchToProps = { loadConfig };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
