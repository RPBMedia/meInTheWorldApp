import gql from 'graphql-tag';

export default gql`
  query GetContinentsByUser($id: ID!) {
    continentsByUser(id: $id) {
      id
      name
    }
  }
`;