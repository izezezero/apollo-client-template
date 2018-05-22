import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import React, { Component } from 'react'

import './App.css'
import logo from './logo.svg'

class App extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
