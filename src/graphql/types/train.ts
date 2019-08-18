const schema = `
type Train {
_id: String!
 name : String
}

# the schema allows the following query:
type Query {
  train(name: String): [Train]
}

type Mutation {
  updateTrain(_id: String, name: String): Status
}

`;

export default schema;
