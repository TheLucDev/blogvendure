import { Asset, Maybe, Node, PaginatedList, Scalars, SortOrder, User } from '@vendure/common/lib/generated-types';

export declare type Blog = Node & {
  __typename?: "Blog";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  metaName: Scalars["String"];
  type: Scalars["String"];
  slug: Scalars["String"];
  image: Asset;
  sortDescription: Scalars["String"];
  body: Scalars["String"];
  published: Scalars["String"];
  user: User;
};
export declare type CreateBlogInput = {
  name: Maybe<Scalars["String"]>;
  metaName: Maybe<Scalars["String"]>;
  type: Maybe<Scalars["String"]>;
  slug: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["ID"]> | null;
  sortDescription: Maybe<Scalars["String"]>;
  body: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
};
export declare type MutationCreateBlogInput = {
    input: CreateBlogInput;
};
export declare type UpdateBlogInput = {
  id: Maybe<Scalars["Int"]>;
  name: Maybe<Scalars["String"]>;
  metaName: Maybe<Scalars["String"]>;
  type: Maybe<Scalars["String"]>;
  slug: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["ID"]> | null;
  sortDescription: Maybe<Scalars["String"]>;
  body: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
};
export declare type MutationUpdateBlogInput = {
    input: UpdateBlogInput;
};
export declare type BlogList = PaginatedList & {
  __typename?: "BlogList";
  items: Array<Blog>;
  totalItems: Scalars["Int"];
};
export declare type BlogListOptions = {
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
  sort?: Maybe<BlogSortParameters>;
};

export declare type BlogSortParameters = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  published?: Maybe<SortOrder>;
};