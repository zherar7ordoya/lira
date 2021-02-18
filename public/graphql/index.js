"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_tools_1 = require("graphql-tools");
require("graphql-import-node");
const character_graphql_1 = __importDefault(require("./schemas/character.graphql"));
const game_graphql_1 = __importDefault(require("./schemas/game.graphql"));
const developer_graphql_1 = __importDefault(require("./schemas/developer.graphql"));
const character_1 = __importDefault(require("./resolvers/character"));
const game_1 = __importDefault(require("./resolvers/game"));
const developer_1 = __importDefault(require("./resolvers/developer"));
const person_graphql_1 = __importDefault(require("./schemas/person.graphql"));
const person_1 = __importDefault(require("./resolvers/person"));
exports.schema = graphql_tools_1.mergeSchemas({
    schemas: [
        character_graphql_1.default,
        game_graphql_1.default,
        developer_graphql_1.default,
        person_graphql_1.default,
    ],
    resolvers: [
        character_1.default,
        game_1.default,
        developer_1.default,
        person_1.default,
    ],
});
