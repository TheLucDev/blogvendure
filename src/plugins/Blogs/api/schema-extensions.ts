import gql from "graphql-tag";

export const commonApiExtensions = gql`
  # auto-generated at runtime
  input BlogListOptions
`;

export const adminApiExtensions = gql`
  ${commonApiExtensions}

  type Blog implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    metaName: String!
    type: String
    slug: String!
    image: Asset
    sortDescription: String
    body: String!
    published: Boolean!
    user: User
  }

  input CreateBlogInput {
    name: String!
    metaName: String
    type: String
    slug: String
    image: ID
    sortDescription: String!
    body: String!
    published: Boolean
  }

  input UpdateBlogInput {
    id: ID!
    name: String
    metaName: String
    type: String
    slug: String
    image: ID
    sortDescription: String
    body: String
    published: Boolean
  }

  type BlogList implements PaginatedList {
    items: [Blog!]!
    totalItems: Int!
  }

  extend type Query {
    blogs(options: BlogListOptions): BlogList!
  }

  extend type Query {
    blog(id: ID, slug: String): Blog
  }

  extend type Mutation {
    addBlog(input: CreateBlogInput): Blog
  }

  extend type Mutation {
    updateBlog(input: UpdateBlogInput!): Blog
  }

  extend type Mutation {
    deleteBlog(id: ID!): DeletionResponse
  }
`;

export const shopApiExtensions = gql`
  ${commonApiExtensions}
  type Blog implements Node {
    id: ID!
    createdAt: DateTime!
    name: String!
    metaName: String!
    type: String!
    slug: String!
    image: Asset
    sortDescription: String!
    body: String!
  }
  type BlogList implements PaginatedList {
    items: [Blog!]!
    totalItems: Int!
  }

  extend type Query {
    blogs(options: BlogListOptions): BlogList!
  }

  extend type Query {
    blog(id: ID, slug: String): Blog
  }
`;
