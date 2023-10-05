export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bait = {
  __typename?: 'Bait';
  brand: Scalars['String']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type Fish = {
  __typename?: 'Fish';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBait: Bait;
  createFish: Fish;
  createPost: Post;
  createUser: User;
};


export type MutationCreateBaitArgs = {
  brand: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};


export type MutationCreateFishArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  baitID: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  fishID: Scalars['ID']['input'];
  imagelink: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  baits: Array<Scalars['String']['input']>;
  birthdate: Scalars['String']['input'];
  favouriteFishingStyle: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  bait: Bait;
  content: Scalars['String']['output'];
  fish: Fish;
  id: Scalars['ID']['output'];
  imagelink: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
  timestamp: Scalars['String']['output'];
  user: User;
  weatherCondition: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fishByName: Scalars['ID']['output'];
  getAllBaits: Array<Bait>;
  getAllFish: Array<Fish>;
  getAllPosts: Array<Post>;
  getAllUsers: Array<User>;
  getUsersBaitsByid: Array<Scalars['String']['output']>;
};


export type QueryFishByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetUsersBaitsByidArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  baits: Array<Bait>;
  birthdate: Scalars['String']['output'];
  favouriteFishingStyle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};