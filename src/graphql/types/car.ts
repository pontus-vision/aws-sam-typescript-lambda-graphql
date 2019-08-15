const schema = `
type Car {
 _id : String
 name: String
 make: String
}

# the schema allows the following query:
type Query {
  car(name: String): [Car]
}

type Mutation {
  updateCarName(_id: String!, name: String!): Car
}

`;

export default schema;
