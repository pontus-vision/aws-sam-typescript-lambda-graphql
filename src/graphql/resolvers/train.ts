"use strict";
import {
  MutationUpdateTrainArgs,
  QueryTrainArgs,
  Train
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Query } from "@src/core/constants/Constants";
import * as format from "../../../node_modules/string-format/index.js";

const resolveFunctions = {
  Query: {
    train(_, args: QueryTrainArgs, context: IAppContext): Promise<Train[]> {
      if (args.name) {
        return context.sqlService
          .runQuery(Query.SEARCH_TRAIN + JSON.stringify(args), [])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return context.sqlService
          .runQuery(Query.SEARCH_TRAINS, [])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      }
    }
  },

  Mutation: {
    updateTrain(
      _,
      args: MutationUpdateTrainArgs,
      context: IAppContext,
      info: any
    ): Promise<Train> {
      const insert = JSON.stringify(args);
      const id = args._id;
      const name = args.name;
      const query = format(Query.MUTATE_TRAIN, id, insert, id, insert);

      return context.sqlService
        .runQuery(query, [])
        .then(res => {
          const response = JSON.parse('{"status": " 200 "}');

          return response;
        })
        .catch(e => console.error(e.stack));
    }
  }
};

export default resolveFunctions;
