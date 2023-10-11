import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FishFragment = { __typename?: 'Fish', id: string, name: string };

export type GetAllFishQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllFishQuery = { __typename?: 'Query', getAllFish: Array<{ __typename?: 'Fish', id: string, name: string }> };

export const FishFragmentDoc = gql`
    fragment Fish on Fish {
  id
  name
}
    `;
export const GetAllFishDocument = gql`
    query getAllFish {
  getAllFish {
    ...Fish
  }
}
    ${FishFragmentDoc}`;

/**
 * __useGetAllFishQuery__
 *
 * To run a query within a React component, call `useGetAllFishQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFishQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFishQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFishQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFishQuery, GetAllFishQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFishQuery, GetAllFishQueryVariables>(GetAllFishDocument, options);
      }
export function useGetAllFishLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFishQuery, GetAllFishQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFishQuery, GetAllFishQueryVariables>(GetAllFishDocument, options);
        }
export type GetAllFishQueryHookResult = ReturnType<typeof useGetAllFishQuery>;
export type GetAllFishLazyQueryHookResult = ReturnType<typeof useGetAllFishLazyQuery>;
export type GetAllFishQueryResult = Apollo.QueryResult<GetAllFishQuery, GetAllFishQueryVariables>;