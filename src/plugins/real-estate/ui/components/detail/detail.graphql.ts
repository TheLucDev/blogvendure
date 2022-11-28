import gql from 'graphql-tag';

import { REAL_ESTATE_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_REAL_ESTATE = gql`
    mutation UpdateRealEstate($input: RealEstateUpdateInput!) {
        updateRealEstate(input: $input) {
            ...RealEstateCustomFields
        }
    }
    ${REAL_ESTATE_FRAGMENT}
`;

export const CREATE_REAL_ESTATE = gql`
    mutation CreateRealEstate($input: RealEstateAddInput!) {
        addRealEstate(input: $input) {
            ...RealEstateCustomFields
        }
    }
    ${REAL_ESTATE_FRAGMENT}
`;