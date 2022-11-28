import gql from 'graphql-tag';

export const REAL_ESTATE_FRAGMENT = gql`
    fragment RealEstateCustomFields on RealEstate {
        id
		projectName
	    descriptions
        price
	    address
        createdAt
        updatedAt
    }
`;