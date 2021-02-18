import { IResolvers } from "graphql-tools";
import { Db } from "mongodb";
import { DEVELOPERS_COLLECTION } from "../../mongodb/collections";

export const developerResolver: IResolvers = {
  Query: {
    async getDevelopers(root: void, args: void, context: Db) {
      try {
        return await context.collection(DEVELOPERS_COLLECTION).find().toArray();
      } catch (error) {
        console.log("Error en QUERY getDevelopers\n");
        console.log(error);
      }
    },
  },
  Mutation: {
    async createDeveloper(root: void, args: any, context: Db) {
      try {
        await context.collection(DEVELOPERS_COLLECTION).insertOne(args.developer);
        return "Developer añadido";
      } catch (error) {
        console.log("Error en MUTATION createDeveloper\n");
        console.log(error);
        console.log("Hubo error en la operación");
      }
    },
  },
};

export default developerResolver;
