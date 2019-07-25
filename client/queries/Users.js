
import gql from 'graphql-tag';

export default gql`
{
  users {
    id
    name
    email
    continents {
      id
    }
    countries {
      id
    }
    locations {
      id
    }
  }
}

`;