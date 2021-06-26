import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Questions from './Components/Questions'
import Result from './Components/Result'
import Home from './Components/Home'
import { connect } from 'react-redux'

class App extends React.Component {

  render() {
    return(
      <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route exact = { true } path='/' component={ Home } />
          <Route exact path='/question/:index' component={ Questions } />
          <Route exact path='/result' component= { Result } />
        </Switch>    
      </BrowserRouter> 
      </div>
    )
  }

}



export default connect()(App);
