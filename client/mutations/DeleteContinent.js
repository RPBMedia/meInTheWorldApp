import gql from 'graphql-tag';

export default gql`
  mutation DeleteContinent(
    $id: ID, 
    $userId: ID,
    ){
    deleteContinent (
      id: $id,
      userId: $userId) {
      id
    }
  }
`;