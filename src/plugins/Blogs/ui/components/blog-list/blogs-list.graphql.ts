import gql from "graphql-tag";

export const GET_BLOGS = gql`
  query GetBlogs($options: BlogListOptions) {
    blogs(options: $options) {
      items {
        id
        name
        image {
          id
          name
          type
          fileSize
          mimeType
          width
          height
          source
          preview
          customFields
        }
        createdAt
      }
      totalItems
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      result
      message
    }
  }
`;
