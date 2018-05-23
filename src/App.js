import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import React, { Component } from 'react'

import './App.css'
import logo from './logo.svg'

class App extends Component {
  state = {
    createUserInput: {
      firstName: '',
      lastName: '',
    },
  }
  handleFirstName(e) {
    this.setState({
      createUserInput: {
        ...this.state.createUserInput,
        firstName: e.target.value,
      },
    })
  }
  handleLastName(e) {
    this.setState({
      createUserInput: {
        ...this.state.createUserInput,
        lastName: e.target.value,
      },
    })
  }
  async createUser() {
    console.log(this.state.createUserInput)
    await this.props.createUser({ variables: { createUserInput: this.state.createUserInput } })
    await this.props.refetch()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>FiveBook</span>
        </header>
        <div className="App-body">
          <div className="input-group">
            <span>firstName</span><input className="text-input" onChange={e => this.handleFirstName(e)} value={this.state.createUserInput.firstName} />
            <span>lastName</span><input className="text-input" onChange={e => this.handleLastName(e)} value={this.state.createUserInput.lastName} />
            <button className="button-input" onClick={() => this.createUser()}>CREATE</button>
          </div>
          <div className="nameCardGroup">
            {
              this.props.data.users.map(user => (<div className="nameCard">{user.fullName}</div>))
            }
          </div>
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

const createUser = gql`
  mutation createUser($createUserInput : CreateUserInput){
    createUser(createUserInput :$createUserInput){
      fullName
    }
  }
`
const AppBindQuery = () => (
  <Mutation mutation={createUser}>
    {
      (createUser, data) => (
        <Query query={getCurrentUser}>
          {
            ({ loading, data, refetch }) => (!loading ? (
              <App data={data} createUser={createUser} refetch={refetch} />
            ) : null)
          }
        </Query>
      )
    }
  </Mutation>
)

export default AppBindQuery
