import schema from "../src/graphql/schema/schema";
import { graphql } from "graphql";
import { MockSQLService } from "./services/sql/MockSQLService";

const allCarsNamesTestCase = {
  id: "all cars names",
  query: `
      query {
        car {
           name 
        }
      }
    `,
  variables: {},

  context: { sqlService: new MockSQLService() },

  expected: {
    data: {
      car: [
        {
          name: "Krishna"
        },
        {
          name: "Quan"
        }
      ]
    }
  }
};

const upsertCarTestCase = {
  id: "car test case",
  mutation: `
      mutation {
        updateCar(_id: "5", name: "Quan") {
          status
        }
      }
    `,
  variables: {},

  // injecting the mock sql service with canned responses
  context: { sqlService: new MockSQLService() },

  // expected result
  expected: {
    data: { updateCar: { status: " 200 " } }
  }
};

describe("Test all car query cases", () => {
  const cases = [allCarsNamesTestCase];

  cases.forEach(obj => {
    const { id, query, variables, context, expected } = obj;
    const sqlServiceSpy = jest.spyOn(context.sqlService, "runQuery");
    test(`query: ${id}`, async () => {
      const result = await graphql(schema, query, null, context, variables);
      expect(sqlServiceSpy).toHaveBeenCalled();
      expect(sqlServiceSpy).toHaveBeenCalledWith(
        "SELECT search::jsonb FROM VEHICLES.Car",
        []
      );

      return expect(result).toEqual(expected);
    });
  });
});

describe("Test all mutation cases", () => {
  const cases = [upsertCarTestCase];

  cases.forEach(obj => {
    const { id, mutation, variables, context, expected } = obj;

    test(`Mutate: ${id}`, async () => {
      const sqlServiceSpy = jest.spyOn(context.sqlService, "runQuery");
      const result = await graphql(schema, mutation, null, context, variables);
      expect(sqlServiceSpy).toHaveBeenCalled();
      expect(sqlServiceSpy).toHaveBeenCalledWith(
        'INSERT INTO VEHICLES.Car(_id, search) values (\'5\', \'{"_id":"5","name":"Quan"}\') ON CONFLICT (_id) DO UPDATE set _id = \'5\', search =\'{"_id":"5","name":"Quan"}\'',
        []
      );

      return expect(result).toEqual(expected);
    });
  });
});
