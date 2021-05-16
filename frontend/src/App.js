import './App.css';
import Home from './components/home';
import AdminHome from './components/adminHome';
import Login from './components/login';
import useToken from "./components/app/userToken";
import {Switch, Route} from 'react-router-dom';
import React from 'react';
import NavBar from './components/navbar';

function App() {
  const {token, setToken} = useToken();
  if(!token) {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path={['/login']}>
          <Login setToken={setToken}/>
        </Route>
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path={['/','*']} component={AdminHome}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
