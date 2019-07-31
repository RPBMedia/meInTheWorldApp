import gql from 'graphql-tag';

export default gql`
  mutation EditUserProfileMutation(
    $id: ID, 
    $name: String,
    $email: String,
    ){
    updateUser (
      id: $id,
      name: $name,
      email: $email) {
      id
      name
      email
    }
  }
`;