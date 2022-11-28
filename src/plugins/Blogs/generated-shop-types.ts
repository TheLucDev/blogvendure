import { Asset, Maybe, Node, PaginatedList, Scalars, SortOrder, User } from '@vendure/common/lib/generated-shop-types';

export declare type Blog = Node & {
    __typename?: 'Blog';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    metaName: Scalars['String'];
    type: Scalars["String"];
    slug: Scalars["String"];
    image: Asset;
    sortDescription: Scalars["String"];
    body: Scalars['String'];
    published: Scalars['String'];
    user: User;
}
export declare type BlogList = PaginatedList & {
    __typename?: 'BlogList';
    items: Array<Blog>;
    totalItems: Scalars['Int'];
}
export declare type BlogListOptions = {
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    sort?: Maybe<BlogSortParameters>;
}

export declare type BlogSortParameters = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    published?: Maybe<SortOrder>;
}