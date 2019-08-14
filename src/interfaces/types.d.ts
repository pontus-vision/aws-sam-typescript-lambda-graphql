export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Car = {
  __typename?: "Car";
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  updateCarName?: Maybe<Car>;
};

export type MutationUpdateCarNameArgs = {
  _id: Scalars["String"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  car?: Maybe<Array<Maybe<Car>>>;
  train?: Maybe<Array<Maybe<Train>>>;
};

export type QueryCarArgs = {
  name?: Maybe<Scalars["String"]>;
  _id?: Maybe<Scalars["String"]>;
  make?: Maybe<Scalars["String"]>;
};

export type QueryTrainArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type Train = {
  __typename?: "Train";
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};
