import gql from 'graphql-tag';

export default gql`
  mutation DeleteCountry(
    $id: ID,
    $continentId: ID
    ){
    deleteCountry (
      id: $id,
      continentId: $continentId) {
      id
    }
  }
`;