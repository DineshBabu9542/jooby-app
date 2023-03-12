import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobItemDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}
export default App
