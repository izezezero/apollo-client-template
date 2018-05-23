import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'

const cache = new InMemoryCache()

const link = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })

const client = new ApolloClient({
  link,
  cache,
})

export default client
