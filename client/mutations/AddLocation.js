import gql from 'graphql-tag';

export default gql`
mutation AddLocation(
  $name: String,
  $userId: ID,
  $continentId: ID,
  $countryId: ID,
  $yearVisited: String,
  $pictureUrl: String,
  ){
  addLocation(
    name: $name,
    userId: $userId,
    continentId: $continentId,
    countryId: $countryId,
    yearVisited: $yearVisited,
    pictureUrl: $pictureUrl
    ) {
      id
      name    
  }
}
`;