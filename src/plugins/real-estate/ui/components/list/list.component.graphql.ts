import gql from 'graphql-tag';

import { REAL_ESTATE_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_REAL_ESTATE = gql`
    query GetAllRealEstates($options: RealEstateListOptions){
		RealEstates(options: $options){
			items{
			...RealEstateCustomFields
			}
			totalItems
       }
    }
	${REAL_ESTATE_FRAGMENT}
`;


export const DELETE_REAL_ESTATE = gql`
   mutation DeleteRealEstate($input:ID!){
      deleteRealEstate(id:$input){
	     ...RealEstateCustomFields 
	  }
   }
   ${REAL_ESTATE_FRAGMENT}
`;