import gql from 'graphql-tag';

export default gql`
  mutation DeleteLocation(
    $id: ID,
    $countryId: ID,
    $continentId: ID
    ){
    deleteLocation (
      id: $id,
      countryId: $countryId,
      continentId: $continentId) {
      id
    }
  }
`;