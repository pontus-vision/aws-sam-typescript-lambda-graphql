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
  steering?: Maybe<Scalars["String"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  updateCar?: Maybe<Status>;
  updateTrain?: Maybe<Status>;
}

export interface MutationUpdateCarArgs {
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
}

export interface MutationUpdateTrainArgs {
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
}

export interface Query {
  __typename?: "Query";
  car?: Maybe<Array<Maybe<Car>>>;
  train?: Maybe<Array<Maybe<Train>>>;
}

export interface QueryCarArgs {
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
}

export interface QueryTrainArgs {
  name?: Maybe<Scalars["String"]>;
}

export interface Status {
  __typename?: "Status";
  status?: Maybe<Scalars["String"]>;
}

export interface Train {
  __typename?: "Train";
  _id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
}
