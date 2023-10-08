import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BaitFragment = { __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string };

export type UserLureBoxQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type UserLureBoxQuery = { __typename?: 'Query', getUserByID: { __typename?: 'User', id: string, baits: Array<{ __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string }> } };

export type GetAllBaitsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllBaitsQuery = { __typename?: 'Query', getAllBaits: Array<{ __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string }> };

export type CreateNewBaitMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  brand: Types.Scalars['String']['input'];
  color: Types.Scalars['String']['input'];
  weight: Types.Scalars['Float']['input'];
}>;


export type CreateNewBaitMutation = { __typename?: 'Mutation', createBait: { __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string } };

export const BaitFragmentDoc = gql`
    fragment Bait on Bait {
  id
  name
  brand
  weight
  color
}
    `;
export const UserLureBoxDocument = gql`
    query UserLureBox($id: ID!) {
  getUserByID(id: $id) {
    id
    baits {
      ...Bait
    }
  }
}
    ${BaitFragmentDoc}`;

/**
 * __useUserLureBoxQuery__
 *
 * To run a query within a React component, call `useUserLureBoxQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLureBoxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLureBoxQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserLureBoxQuery(baseOptions: Apollo.QueryHookOptions<UserLureBoxQuery, UserLureBoxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLureBoxQuery, UserLureBoxQueryVariables>(UserLureBoxDocument, options);
      }
export function useUserLureBoxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserLureBoxQuery, UserLureBoxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLureBoxQuery, UserLureBoxQueryVariables>(UserLureBoxDocument, options);
        }
export type UserLureBoxQueryHookResult = ReturnType<typeof useUserLureBoxQuery>;
export type UserLureBoxLazyQueryHookResult = ReturnType<typeof useUserLureBoxLazyQuery>;
export type UserLureBoxQueryResult = Apollo.QueryResult<UserLureBoxQuery, UserLureBoxQueryVariables>;
export const GetAllBaitsDocument = gql`
    query GetAllBaits {
  getAllBaits {
    ...Bait
  }
}
    ${BaitFragmentDoc}`;

/**
 * __useGetAllBaitsQuery__
 *
 * To run a query within a React component, call `useGetAllBaitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBaitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBaitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBaitsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBaitsQuery, GetAllBaitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBaitsQuery, GetAllBaitsQueryVariables>(GetAllBaitsDocument, options);
      }
export function useGetAllBaitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBaitsQuery, GetAllBaitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBaitsQuery, GetAllBaitsQueryVariables>(GetAllBaitsDocument, options);
        }
export type GetAllBaitsQueryHookResult = ReturnType<typeof useGetAllBaitsQuery>;
export type GetAllBaitsLazyQueryHookResult = ReturnType<typeof useGetAllBaitsLazyQuery>;
export type GetAllBaitsQueryResult = Apollo.QueryResult<GetAllBaitsQuery, GetAllBaitsQueryVariables>;
export const CreateNewBaitDocument = gql`
    mutation CreateNewBait($name: String!, $brand: String!, $color: String!, $weight: Float!) {
  createBait(name: $name, brand: $brand, color: $color, weight: $weight) {
    ...Bait
  }
}
    ${BaitFragmentDoc}`;
export type CreateNewBaitMutationFn = Apollo.MutationFunction<CreateNewBaitMutation, CreateNewBaitMutationVariables>;

/**
 * __useCreateNewBaitMutation__
 *
 * To run a mutation, you first call `useCreateNewBaitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewBaitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewBaitMutation, { data, loading, error }] = useCreateNewBaitMutation({
 *   variables: {
 *      name: // value for 'name'
 *      brand: // value for 'brand'
 *      color: // value for 'color'
 *      weight: // value for 'weight'
 *   },
 * });
 */
export function useCreateNewBaitMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewBaitMutation, CreateNewBaitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewBaitMutation, CreateNewBaitMutationVariables>(CreateNewBaitDocument, options);
      }
export type CreateNewBaitMutationHookResult = ReturnType<typeof useCreateNewBaitMutation>;
export type CreateNewBaitMutationResult = Apollo.MutationResult<CreateNewBaitMutation>;
export type CreateNewBaitMutationOptions = Apollo.BaseMutationOptions<CreateNewBaitMutation, CreateNewBaitMutationVariables>;