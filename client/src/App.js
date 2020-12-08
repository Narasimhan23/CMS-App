import React, {useEffect} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/layout/navbar"
import Landing from "./components/layout/landing"
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Alert from "./components/layout/alert";
import Posts from "./components/post/posts";
import Post from "./components/post/post";

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/auth-action"
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Alert/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/post/:id" component={Post} />
            </Switch>
        </div>
      </Router>
    </Provider>
  );  
}

export default App;
