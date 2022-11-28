import gql from 'graphql-tag';

import { REAL_ESTATE_FRAGMENT } from '../../../common/fragments.graphql';

export const GET_REAL_ESTATE = gql`
  query GetRealEstate($id: ID!) {
    RealEstate(id: $id) {
      ...RealEstateCustomFields
    }
  }
  ${REAL_ESTATE_FRAGMENT}
`;