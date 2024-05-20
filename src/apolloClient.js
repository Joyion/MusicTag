import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

const link = createHttpLink({
    uri: 'http://localhost:9000/graphql',
    credentials: 'include'
  });
  
  export const MusicTagGraphqlServer = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });


  export const GET_SONGS = gql`
  query GetSongs {
    songs {
      name
    }
  }
`;

export const GET_USER = gql`
query GetUser {
  user {
    username,
    email
  }
}
`;


export const REGISTER = gql`
  mutation register ($username: String, $password: String, $email: String) {
    register(username: $username, password: $password, email: $email) {
        user {
            username,
            email
        }
        message
    }
  }
  `;


export const LOGOUT = gql`
  mutation logout ($username: String) {
    logout(username: $username) {
      message
    }
  }
  `;