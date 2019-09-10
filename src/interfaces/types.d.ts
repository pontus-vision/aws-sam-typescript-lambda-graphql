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
  _id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type CarInput = {
  _id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  updateCar?: Maybe<Status>;
  updateTrain?: Maybe<Status>;
};

export type MutationUpdateCarArgs = {
  car?: Maybe<CarInput>;
};

export type MutationUpdateTrainArgs = {
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  car?: Maybe<Array<Maybe<Car>>>;
  train?: Maybe<Array<Maybe<Train>>>;
};

export type QueryCarArgs = {
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type QueryTrainArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type Status = {
  __typename?: "Status";
  status?: Maybe<Scalars["String"]>;
};

export type Train = {
  __typename?: "Train";
  _id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};
