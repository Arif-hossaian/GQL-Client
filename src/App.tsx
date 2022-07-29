import { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/Clients';
import AddClientModal from './components/AddClientModal';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

const App: FC = () => {
  return (
    <div className="px-8 mx-auto max-w-screen-lg">
      <ApolloProvider client={client}>
        <AddClientModal />
        <Clients />
      </ApolloProvider>
    </div>
  );
};

export default App;
