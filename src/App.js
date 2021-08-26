import './css/App.css';
import Login from './components/Login';
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import {Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/hackideas" component={Login}></Route>
        <Route exact path="/hackideas/home" component={Home}></Route>
      </Switch>
    </>
  );
}

export default App;
