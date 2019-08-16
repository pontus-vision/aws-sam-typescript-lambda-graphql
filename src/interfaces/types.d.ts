export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Car {
  __typename?: "Car";
  _id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  updateCar?: Maybe<Car>;
}

export interface MutationUpdateCarArgs {
  _id: Scalars["String"];
  name: Scalars["String"];
}

export interface Query {
  __typename?: "Query";
  car?: Maybe<Array<Maybe<Car>>>;
  train?: Maybe<Array<Maybe<Train>>>;
}

export interface QueryCarArgs {
  name?: Maybe<Scalars["String"]>;
}

export interface QueryTrainArgs {
  name?: Maybe<Scalars["String"]>;
}

export interface Train {
  __typename?: "Train";
  name?: Maybe<Scalars["String"]>;
}