import gql from 'graphql-tag';

export default gql`
  mutation DeleteCountry(
    $id: ID,
    $userId: ID,
    $continentId: ID
    ){
    deleteCountry (
      id: $id,
      userId: $userId,
      continentId: $continentId) {
      id
    }
  }
`;