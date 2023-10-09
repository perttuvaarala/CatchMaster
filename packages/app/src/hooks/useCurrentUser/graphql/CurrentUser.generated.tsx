import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserFragment = { __typename?: 'User', id: string, username: string, email: string, birthdate?: string | null, favouriteFishingStyle?: string | null, baits: Array<{ __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string }> };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, email: string, birthdate?: string | null, favouriteFishingStyle?: string | null, baits: Array<{ __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string }> } | null };

export type ModifyCurrentUserMutationVariables = Types.Exact<{
  username?: Types.InputMaybe<Types.Scalars['String']['input']>;
  birthdate?: Types.InputMaybe<Types.Scalars['String']['input']>;
  favouriteFishingStyle?: Types.InputMaybe<Types.Scalars['String']['input']>;
  baitIDs?: Types.InputMaybe<Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input']>;
}>;


export type ModifyCurrentUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'User', id: string, username: string, email: string, birthdate?: string | null, favouriteFishingStyle?: string | null, baits: Array<{ __typename?: 'Bait', id: string, name: string, brand: string, weight: number, color: string }> } };

export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  id
  username
  email
  birthdate
  favouriteFishingStyle
  baits {
    id
    name
    brand
    weight
    color
  }
}
    `;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const ModifyCurrentUserDocument = gql`
    mutation ModifyCurrentUser($username: String, $birthdate: String, $favouriteFishingStyle: String, $baitIDs: [ID!]) {
  editUser(
    username: $username
    birthdate: $birthdate
    favouriteFishingStyle: $favouriteFishingStyle
    baits: $baitIDs
  ) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type ModifyCurrentUserMutationFn = Apollo.MutationFunction<ModifyCurrentUserMutation, ModifyCurrentUserMutationVariables>;

/**
 * __useModifyCurrentUserMutation__
 *
 * To run a mutation, you first call `useModifyCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyCurrentUserMutation, { data, loading, error }] = useModifyCurrentUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      birthdate: // value for 'birthdate'
 *      favouriteFishingStyle: // value for 'favouriteFishingStyle'
 *      baitIDs: // value for 'baitIDs'
 *   },
 * });
 */
export function useModifyCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<ModifyCurrentUserMutation, ModifyCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyCurrentUserMutation, ModifyCurrentUserMutationVariables>(ModifyCurrentUserDocument, options);
      }
export type ModifyCurrentUserMutationHookResult = ReturnType<typeof useModifyCurrentUserMutation>;
export type ModifyCurrentUserMutationResult = Apollo.MutationResult<ModifyCurrentUserMutation>;
export type ModifyCurrentUserMutationOptions = Apollo.BaseMutationOptions<ModifyCurrentUserMutation, ModifyCurrentUserMutationVariables>;