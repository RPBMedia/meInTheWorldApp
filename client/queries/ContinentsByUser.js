import gql from 'graphql-tag';

export default gql`
  query GetContinentsByUser($id: ID!) {
    continentsByUser(userId: $id) {
      id
      name
    }
  }
`;