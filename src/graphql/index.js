import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'

const cache = new InMemoryCache()
const WS_ENDPOINT = 'ws://localhost:5000/subscriptions'
const wsClient = new SubscriptionClient(WS_ENDPOINT, {
  reconnect: true,
})

const wsLink = new WebSocketLink(wsClient)

const httpLink = createHttpLink({ uri: 'http://localhost:8880/graphql' })

const margelink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    console.log(operation)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: margelink,
  cache,
})

export default client
