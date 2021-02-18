"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("../../data/data.json"));
const personResolver = {
    Query: {
        getPerson(__, args) {
            const [found] = data_json_1.default.people.filter((p) => p.id === args.id);
            return found;
        },
    },
    Person: {
        __resolveType(obj) {
            return obj.age ? "Male" : "Female";
        },
    },
    Male: {
        countries(parent) {
            const countries = [];
            parent.countries.forEach((countryId) => countries.push(...data_json_1.default.countries.filter((c) => c.id === countryId)));
        },
    },
    Country: {
        people(parent) {
            const chars = [];
            parent.people.forEach((charId) => chars.push(...data_json_1.default.people.filter(c => c.id === charId)));
            return chars;
        }
    }
};
exports.default = personResolver;
