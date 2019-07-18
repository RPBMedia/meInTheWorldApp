import gql from 'graphql-tag';

export default gql`
query GetLocationsByUser($id: ID!) {
  locationsByUser(userId: $id) {
    id
    name
    yearVisited
    continent {
      name
    }
    country {
      name
    }
  }
}
`;

