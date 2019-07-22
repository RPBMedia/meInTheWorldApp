import gql from 'graphql-tag';

export default gql`
  query GetCountriesByUser($id: ID!) {
    countriesByUser(userId: $id) {
      id
      name
    }
  }
`;

