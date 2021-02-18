import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import "graphql-import-node";
// Esquemas
import characterSchema from "./schemas/character.graphql";
import gameSchema from "./schemas/game.graphql";
import developerSchema from "./schemas/developer.graphql";
// Resolutores
import characterResolver from "./resolvers/character";
import gameResolver from "./resolvers/game";
import developerResolver from "./resolvers/developer";

import personSchema from "./schemas/person.graphql";
import personResolver from "./resolvers/person";

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [
    characterSchema, //
    gameSchema,
    developerSchema,
    personSchema,
  ],
  resolvers: [
    characterResolver, //
    gameResolver,
    developerResolver,
    personResolver,
  ],
});
