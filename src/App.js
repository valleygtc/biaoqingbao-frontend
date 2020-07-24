import React, { useState } from 'react';
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
import Message from './Message';
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

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
          <Route path="/">
            <Main darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
          </Route>
        </Switch>
      </ConnectedRouter>
      <Message />
    </ThemeProvider>
  );
}
