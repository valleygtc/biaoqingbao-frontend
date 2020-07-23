import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Main from './Main';
import SignUp from './SignUp';
import SignIn from './SignIn';

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
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Main darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
