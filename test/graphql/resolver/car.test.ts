import { add } from "../../../src/graphql/resolvers/car";
import * as format from "../../../node_modules/string-format/index.js";

test("2 + 3 = 5", () => {
  expect(add(2, 3)).toBe(5);
});
