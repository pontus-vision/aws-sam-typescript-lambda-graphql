const schema = `

directive @sensitive on FIELD_DEFINITION

type Car {
_id: String!
 name : String @sensitive
 motor: String @sensitive
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
