import gql from 'graphql-tag';

export default gql`
  mutation DeleteLocation(
    $id: ID,
    $userId: ID,
    $countryId: ID,
    $continentId: ID
    ){
    deleteLocation (
      id: $id,
      userId: $userId,
      countryId: $countryId,
      continentId: $continentId) {
      id
    }
  }
`;