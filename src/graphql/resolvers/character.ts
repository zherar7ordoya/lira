import { IResolvers } from "graphql-tools";
import { Db, ObjectId } from "mongodb";
import {
  CHARACTERS_COLLECTION,
  GAMES_COLLECTION,
} from "../../mongodb/collections";
import { ICharacter } from "../../interfaces/ICharacter";

const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context.collection(CHARACTERS_COLLECTION).find().toArray();
      } catch (error) {
        console.log("Error en QUERY (getCharacters)\n");
        console.log(error);
      }
    },
    async getCharacter(root: void, args: any, context: Db) {
      try {
        const found = await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectId(args._id) });
        return found;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      try {
        // PROTOCOLO DE SEGURIDAD (Bloquear ingresos duplicados)
        const regexp = new RegExp(args.character.name, "i");
        const exists = await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ name: regexp });

        if (exists) {
          throw new Error("PERSONAJE YA EXISTE");
        }

        await context
          .collection(CHARACTERS_COLLECTION)
          .insertOne(args.character);
        return "Ingreso correcto";
      } catch (error) {
        return error.message;
      }
    },
    async editCharacter(
      root: void,
      { _id, character }: { _id: string; character: ICharacter },
      context: Db
    ) {
      try {
        const exists = await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });
        if (exists) {
          await context
            .collection(CHARACTERS_COLLECTION)
            .updateOne({ _id: new ObjectId(_id) }, { $set: character });
          return "Personaje actualizado";
        }
        throw new Error("EL PERSONAJE NO EXISTE");
      } catch (error) {
        return error.message;
      }
    },
  },
  Character: {
    async games(parent: ICharacter, args: void, context: Db) {
      const gameList = parent.games.map(
        async (gameId) =>
          await context
            .collection(GAMES_COLLECTION)
            .findOne({ _id: new ObjectId(gameId) })
      );
      return gameList;
    },
  },
};

export default characterResolver;
