import gql from 'graphql-tag';

export default gql`
    {
        user{
            id
            email
            name
            continents {
                name
                id
            }
            countries {
                name
                id
            }
            locations {
                name
                yearVisited
                id
                continent {
                    name
                }
                country {
                    name
                }
            }
        }
    }
`;