const schema = `
type Train {
 name : String
}

# the schema allows the following query:
type Query {
  train(name: String): [Train]
}

`;

export default schema;
