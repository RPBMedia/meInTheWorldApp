import gql from 'graphql-tag';

export default gql`
mutation AddCountry($name: String, $userId: ID, $continentId: ID){
  addCountry(
    name: $name,
    userId: $userId,
    continentId: $continentId) {
    id
    name
    countries {
      id
      name
    }
  }
}
`;