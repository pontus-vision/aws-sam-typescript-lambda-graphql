const schema = `
type Car {
_id: String!
 name : String
}

type Status {
 status : String
}

# the schema allows the following query:
type Query {
  car(_id: String, name: String): [Car]
}

type Mutation {
  updateCar(_id: String, name: String): Status
}

`;

export default schema;
