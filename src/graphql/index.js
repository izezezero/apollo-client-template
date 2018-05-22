import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
<<<<<<< HEAD
import { InMemoryCache } from 'apollo-cache-inmemory'
=======
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { withClientState } from 'apollo-link-state'
import { persistCache } from 'apollo-cache-persist'
>>>>>>> 702c6f86ce842cf10712d33eae7df0806a8d3550

import gql from 'graphql-tag'

const cache = new InMemoryCache()

<<<<<<< HEAD
const link = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })
=======
persistCache({
  cache,
  storage: window.localStorage,
})

console.log(process)


const graphqlWs = new SubscriptionClient(process.env.REACT_APP_GRAPHQL_SUBSCRIPTION, {
  reconnect: true,
})

const defaultState = {
  currentUser: {
    __typename: 'CurrentUser',
    name: '',
  },
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateCurrentUser: (_, { userInput }, { cache }) => {
        const query = gql`
        query GetCurrentUser {
          currentUser @client {
            name
          }
        }
      `
        cache.writeQuery({
          query,
          data: {
            currentUser: userInput,
          },
        })
      },
      resetState: (_, d, { cache }) => {
        cache.writeData({ data: defaultState })
      },
    },
  },
})


const linkWs = new WebSocketLink(graphqlWs)
const linkHttp = ApolloLink.from([
  stateLink,
  createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
])
const linkAuth = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  linkWs,
  linkAuth.concat(linkHttp),
)
>>>>>>> 702c6f86ce842cf10712d33eae7df0806a8d3550

const client = new ApolloClient({
  link,
  cache,
})

export default client
