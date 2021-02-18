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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const collections_1 = require("../../mongodb/collections");
const characterResolver = {
    Query: {
        getCharacters(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield context.collection(collections_1.CHARACTERS_COLLECTION).find().toArray();
                }
                catch (error) {
                    console.log("Error en QUERY (getCharacters)\n");
                    console.log(error);
                }
            });
        },
        getCharacter(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const found = yield context
                        .collection(collections_1.CHARACTERS_COLLECTION)
                        .findOne({ _id: new mongodb_1.ObjectId(args._id) });
                    return found;
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
    },
    Mutation: {
        createCharacter(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const regexp = new RegExp(args.character.name, "i");
                    const exists = yield context
                        .collection(collections_1.CHARACTERS_COLLECTION)
                        .findOne({ name: regexp });
                    if (exists) {
                        throw new Error("PERSONAJE YA EXISTE");
                    }
                    yield context
                        .collection(collections_1.CHARACTERS_COLLECTION)
                        .insertOne(args.character);
                    return "Ingreso correcto";
                }
                catch (error) {
                    return error.message;
                }
            });
        },
        editCharacter(root, { _id, character }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const exists = yield context
                        .collection(collections_1.CHARACTERS_COLLECTION)
                        .findOne({ _id: new mongodb_1.ObjectId(_id) });
                    if (exists) {
                        yield context
                            .collection(collections_1.CHARACTERS_COLLECTION)
                            .updateOne({ _id: new mongodb_1.ObjectId(_id) }, { $set: character });
                        return "Personaje actualizado";
                    }
                    throw new Error("EL PERSONAJE NO EXISTE");
                }
                catch (error) {
                    return error.message;
                }
            });
        },
    },
    Character: {
        games(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const gameList = parent.games.map((gameId) => __awaiter(this, void 0, void 0, function* () {
                    return yield context
                        .collection(collections_1.GAMES_COLLECTION)
                        .findOne({ _id: new mongodb_1.ObjectId(gameId) });
                }));
                return gameList;
            });
        },
    },
};
exports.default = characterResolver;
