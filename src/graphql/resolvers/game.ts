import { IResolvers } from "graphql-tools";
import { Db, ObjectId } from "mongodb";
import {
  GAMES_COLLECTION,
  DEVELOPERS_COLLECTION,
} from "../../mongodb/collections";

const gameResolver: IResolvers = {
  Query: {
    async getGames(root: void, args: any, context: Db) {
      try {
        return await context.collection(GAMES_COLLECTION).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createGame(root: void, args: any, context: Db) {
      try {
        await context.collection(GAMES_COLLECTION).insertOne(args.game);
        return `${args.game.title} añadido correctamente`;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Game: {
    async developers(parent: any, args: void, context: Db) {
      const devList = parent.developers.map(async (id: string) => 
        await context
          .collection(DEVELOPERS_COLLECTION)
          .findOne({ _id: new ObjectId(id) })
      );
      return devList;
    },
  },
};

export default gameResolver;
