import gql from 'graphql-tag';

export const GET_BLOG = gql`
    query GetBlog($id: ID!) {
        blog(id: $id) {
            id
            name
            metaName
            type
            slug
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
            sortDescription
            body
            published
        }
    }
`;
