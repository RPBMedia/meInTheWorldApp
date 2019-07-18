import gql from 'graphql-tag';

export default gql`
mutation AddContinent($name: String, $userId: ID){
  addContinent(
    name: $name,
    userId: $userId) {
    id
    name
    user {
      id
      name
    }
  }
}
`;