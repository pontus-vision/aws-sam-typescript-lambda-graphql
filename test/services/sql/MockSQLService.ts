export class MockSQLService {
  public runQuery(queryText: string, queryVals: string[]): any {
    const res = JSON.parse(
      '{"command":"SELECT","rowCount":2,"oid":null,"rows":[{"search":{"_id":"4","name":"Krishna"}},{"search":{"_id":"5","name":"Quan"}}],"fields":[{"name":"search","tableID":16395,"columnID":2,"dataTypeID":3802,"dataTypeSize":-1,"dataTypeModifier":-1,"format":"text"}],"_parsers":[null],"_types":{"_types":{"arrayParser":{}},"text":{},"binary":{}},"RowCtor":null,"rowAsArray":false}'
    );
    const promise = Promise.resolve(res).then(result => {
      return result;
    });

    return promise;
  }
}
