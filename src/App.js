<<<<<<< HEAD
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import React, { Component } from 'react'

import './App.css'
import logo from './logo.svg'

class App extends Component {
  componentDidMount() {
    console.log(this.props)
  }
=======
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
>>>>>>> 702c6f86ce842cf10712d33eae7df0806a8d3550
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
<<<<<<< HEAD
          <h1 className="App-title">Welcome to Apollo Client</h1>
        </header>
        <div className="nameCardGroup">
          {this.props.data.users.map(user => (<div className="nameCard">{user.fullName}</div>))}
        </div>
      </div>
    )
  }
}

const getCurrentUser = gql`
  query GetCurrentUser {
    users {
      fullName
    }
  }
`

const AppBindQuery = () => (
  <Query query={getCurrentUser}>
    {
      ({ loading, data }) => (!loading ? (
        <App data={data} />
      ) : null)
    }
  </Query>)

export default AppBindQuery
=======
          <h1 className="App-title">Welcome to Isoon World</h1>
          test1234
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
>>>>>>> 702c6f86ce842cf10712d33eae7df0806a8d3550
