"use strict";
import {
  MutationUpdateTrainArgs,
  QueryTrainArgs,
  Train
} from "@src/interfaces/types";
import { IAppContext } from "@src/interfaces/IAppContext";
import { Queries } from "@src/core/constants/Queries";
import * as format from "string-format/index.js";

const resolveFunctions = {
  Query: {
    train(_, args: QueryTrainArgs, context: IAppContext): Promise<Train[]> {
      if (args.name) {
        return context.sqlService
          .runQuery(Queries.SEARCH_TRAIN + JSON.stringify(args), [])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return context.sqlService
          .runQuery(Queries.SEARCH_TRAINS, [])
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
      const query = format(Queries.MUTATE_TRAIN, id, insert, id, insert);

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
