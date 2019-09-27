import schema from "@src/graphql/schema/schema";
import { graphql } from "graphql";
import { MockSQLService } from "./services/sql/MockSQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";

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

  context: {
    cryptographyService: new CryptographyService(),
    sqlService: new MockSQLService()
  },

  expected: {
    data: {
      car: [
        {
          name: "David"
        }
      ]
    }
  },
  spy: {
    queryText: "SELECT search::jsonb FROM VEHICLES.Car",
    queryParam: []
  }
};

const selectedCarTestCase = {
  id: "selected cars",
  query: `
      query {
        car(_id: "5", name: "Danielle"){
          name
        }
      }
    `,
  variables: {},

  context: {
    cryptographyService: new CryptographyService(),
    sqlService: new MockSQLService()
  },

  expected: {
    data: {
      car: [
        {
          name: "David"
        }
      ]
    }
  },
  spy: {
    queryText: "SELECT search::jsonb FROM VEHICLES.Car WHERE search @> $1",
    queryParam: ['{"_id":"5","name":"naAifYUUhtjLQ1oXneqytw=="}']
  }
};

const upsertCarTestCase = {
  id: "car test case",
  mutation: `
      mutation {
         updateCar(car: {
          name: "David"
          _id: "12"
        }) {
          status
        }
      }
    `,
  variables: {},

  // injecting the mock sql service with canned responses
  context: {
    cryptographyService: new CryptographyService(),
    sqlService: new MockSQLService()
  },

  // expected result
  expected: {
    data: { updateCar: { status: " 200 " } }
  },

  spy: {
    queryText:
      "INSERT INTO VEHICLES.Car(_id, search) values ($1, $2) ON CONFLICT (_id) DO UPDATE set _id = $3, search =$4",
    queryParam: [
      "12",
      '{"_id":"12","name":"R+IaJf3zUDp3WmkgwkmV6Q=="}',
      "12",
      '{"_id":"12","name":"R+IaJf3zUDp3WmkgwkmV6Q=="}'
    ]
  }
};

describe("Test all car query cases", () => {
  const cases = [allCarsNamesTestCase, selectedCarTestCase];

  cases.forEach(obj => {
    const { id, query, variables, context, expected, spy } = obj;
    const sqlServiceSpy = jest.spyOn(context.sqlService, "runQuery");
    test(`query: ${id}`, async () => {
      const result = await graphql(schema, query, null, context, variables);
      expect(sqlServiceSpy).toHaveBeenCalled();
      expect(sqlServiceSpy).toHaveBeenCalledWith(spy.queryText, spy.queryParam);

      return expect(result).toEqual(expected);
    });
  });
});

describe("Test all mutation cases", () => {
  const cases = [upsertCarTestCase];

  cases.forEach(obj => {
    const { id, mutation, variables, context, expected, spy } = obj;

    test(`Mutate: ${id}`, async () => {
      const sqlServiceSpy = jest.spyOn(context.sqlService, "runQuery");
      const result = await graphql(schema, mutation, null, context, variables);
      expect(sqlServiceSpy).toHaveBeenCalled();
      expect(sqlServiceSpy).toHaveBeenCalledWith(spy.queryText, spy.queryParam);

      return expect(result).toEqual(expected);
    });
  });
});
