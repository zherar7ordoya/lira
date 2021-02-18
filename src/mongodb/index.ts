import { Db, MongoClient } from "mongodb";
import config from "../config";

import colors from "colors";

export default class MongoLib {
  private client: MongoClient;
  private dbName: any = config.dbName;
  private mongoUri: any = config.mongoUri;
  private static connection: Db;

  constructor() {
    this.client = new MongoClient(this.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        MongoLib.connection = this.client.db(this.dbName);
        console.log(colors.cyan(`\t*MONGO:`) + colors.inverse(`\tOKAY\n`));
      } catch (error) {
        console.log(error);
      }
    }
    return MongoLib.connection;
  }
}
