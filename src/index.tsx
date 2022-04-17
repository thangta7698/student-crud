import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { history } from './ultils';
import { SnackbarProvider } from 'notistack';


ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={1} autoHideDuration={2000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
          <App />
        </SnackbarProvider>
      </ConnectedRouter >
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
