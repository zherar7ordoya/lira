"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("./graphql");
const mongodb_1 = __importDefault(require("./mongodb"));
const config_1 = __importDefault(require("./config"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const colors_1 = __importDefault(require("colors"));
const app = express_1.default();
app.use(cors_1.default());
const server = new apollo_server_express_1.ApolloServer({
    schema: graphql_1.schema,
    playground: true,
    introspection: true,
    context: () => __awaiter(void 0, void 0, void 0, function* () { return new mongodb_1.default().connect(); }),
    validationRules: [graphql_depth_limit_1.default(3)],
});
server.applyMiddleware({ app });
app.get("/", (req, res) => {
    res.send('<p><a href="http://localhost:5000/graphql">Cliente GraphQL</a></p>\n');
});
app.listen(config_1.default.port, () => {
    console.log(colors_1.default.cyan(`\n\tPUERTO:`) + colors_1.default.inverse(`\t${config_1.default.port}`));
});
