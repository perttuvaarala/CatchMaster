import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: string, lon: number, lat: number, lenght: number, weight: number, content: string, timestamp: string, imagelink: string, weatherCondition: string, bait: { __typename?: 'Bait', id: string }, user: { __typename?: 'User', username: string, id: string }, fish: { __typename?: 'Fish', id: string, name: string } }> };

export type CreatePostMutationVariables = Types.Exact<{
  lon: Types.Scalars['Float']['input'];
  lat: Types.Scalars['Float']['input'];
  lenght: Types.Scalars['Float']['input'];
  weight: Types.Scalars['Float']['input'];
  content: Types.Scalars['String']['input'];
  imagelink: Types.Scalars['String']['input'];
  baitID: Types.Scalars['ID']['input'];
  userID: Types.Scalars['ID']['input'];
  fishID: Types.Scalars['ID']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, lon: number, lat: number, content: string, timestamp: string, imagelink: string, weatherCondition: string, bait: { __typename?: 'Bait', id: string }, user: { __typename?: 'User', username: string, id: string }, fish: { __typename?: 'Fish', id: string } } };


export const AllPostsDocument = gql`
    query AllPosts {
  getAllPosts {
    id
    lon
    lat
    lenght
    weight
    content
    timestamp
    imagelink
    bait {
      id
    }
    user {
      username
      id
    }
    fish {
      id
      name
    }
    weatherCondition
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($lon: Float!, $lat: Float!, $lenght: Float!, $weight: Float!, $content: String!, $imagelink: String!, $baitID: ID!, $userID: ID!, $fishID: ID!) {
  createPost(
    lon: $lon
    lat: $lat
    lenght: $lenght
    weight: $weight
    content: $content
    imagelink: $imagelink
    baitID: $baitID
    userID: $userID
    fishID: $fishID
  ) {
    id
    lon
    lat
    content
    timestamp
    imagelink
    bait {
      id
    }
    user {
      username
      id
    }
    fish {
      id
    }
    weatherCondition
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      lon: // value for 'lon'
 *      lat: // value for 'lat'
 *      lenght: // value for 'lenght'
 *      weight: // value for 'weight'
 *      content: // value for 'content'
 *      imagelink: // value for 'imagelink'
 *      baitID: // value for 'baitID'
 *      userID: // value for 'userID'
 *      fishID: // value for 'fishID'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;