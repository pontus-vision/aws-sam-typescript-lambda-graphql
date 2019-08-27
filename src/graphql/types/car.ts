const schema = `

directive @sensitive on FIELD_DEFINITION

type Car {
_id: String!
 name : String @sensitive
}

type Status {
 status : String
}

input CarInput {
_id: String!
 name : String
}

# the schema allows the following query:
type Query {
  car(_id: String, name: String): [Car]
}

type Mutation {
  updateCar(car: CarInput): Status 
}

`;

export default schema;
