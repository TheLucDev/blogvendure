import gql from 'graphql-tag';

export const ADD_BLOG = gql`
    mutation AddBlog($input: CreateBlogInput!) {
        addBlog(input: $input) {
            id
        }
    }
`;

export const UPDATE_BLOG = gql`
    mutation UpdateBlog($input: UpdateBlogInput!) {
        updateBlog(input: $input) {
            id
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
        }
    }
`;
