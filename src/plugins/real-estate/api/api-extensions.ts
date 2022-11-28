import { gql } from 'apollo-server-core';

const commonExtensions = gql `
  type RealEstate implements Node {
        id: ID!
		projectName: String!
	    descriptions: String!
        price: String!
	    address: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    
    
  input RealEstateAddInput{
	  projectName:String
	  descriptions:String
      price:String
	  address: String!
  }
`;

export const adminApiExtensions = gql`
	${commonExtensions}
    
	input RealEstateUpdateInput{
	  id: ID!
	  projectName:String!
	  descriptions:String!
      price:String!
	  address: String!
	}
	type RealEstateList implements PaginatedList {
     items: [RealEstate!]!
     totalItems: Int!
    }
	
    extend type Query {
        RealEstates(options: RealEstateListOptions): RealEstateList!
		RealEstate(id:ID!):RealEstate
    }
	
	extend type Mutation {
        addRealEstate(input:RealEstateAddInput!): RealEstate!
		updateRealEstate(input:RealEstateUpdateInput!): RealEstate!
		deleteRealEstate(id:ID!): RealEstate!
		deleteAllRealEstates: Boolean!
    }
    input RealEstateListOptions
`;
