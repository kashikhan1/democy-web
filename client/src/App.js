import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Route } from 'react-router';

import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
// import NotFoundPage from './components/NotFoundPage'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        {localStorage.usertoken ? <Route path="/" component={Dashboard} /> : <Route exact path="/" component={Login} /> }
        <Route exact path="/register" component={Register} /> }
        <Route exact path="/profile" component={Profile} /> }
        </div>
      </Router>
  //     <Router>
  //   <Route path="login" component={Login}/>
  //   <Route path="/" component={App}>
  //     <Route path="/" component={Dashboard}/>
  //     <Route path="dashboard" component={Dashboard}/>
  //     <Route path="form" component={Profile}/>
  //     <Route path="table" component={Dashboard}/>
  //     <Route path="*" component={NotFoundPage}/>
  //   </Route>
  // </Router>
    )
  }
}

export default App
