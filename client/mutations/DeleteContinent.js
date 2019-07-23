import gql from 'graphql-tag';

export default gql`
  mutation DeleteContinent(
    $id: ID, 
    ){
    deleteContinent (id: $id) {
      id
    }
  }
`;