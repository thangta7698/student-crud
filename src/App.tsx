import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { HomeLayout, PrivateRoute } from './components/common/';
import AuthComponent from './features/Auth';

function App() {
  useEffect(() => {
    // cityApi.getAll({ _page: 1, _litmit: 10, _totalRows: 10 })
    //   .then((respone) => {
    //     console.log(respone);
    //   })

  }, []);
  return (
    <Switch>
      <Route path='/login'>
        <AuthComponent />
      </Route>
      <PrivateRoute path='/home'>
        <HomeLayout />
      </PrivateRoute>
    </Switch>

  );
}

export default App;
