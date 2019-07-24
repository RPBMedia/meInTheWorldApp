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
                user {
                    id
                }
            }
            countries {
                name
                id
                user {
                    id
                }
                continent {
                    name
                    id
                    user {
                        id
                    }
                }
            }
            locations {
                name
                yearVisited
                id
                user {
                    id
                }
                continent {
                    name
                    id
                    user {
                        id
                    }
                }
                country {
                    name
                    id
                    user {
                        id
                    }               
                }
            }
        }
    }
`;