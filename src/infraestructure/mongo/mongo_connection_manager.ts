import * as mongoDB from 'mongodb';
import { Logger } from '../logger/logger';
export class MongoConnectionManager {
  client: mongoDB.MongoClient;
  db: mongoDB.Db;
  url: string;
  dbName: string;
  constructor (url: string, dbName: string) {
    this.url = url;
    this.dbName = dbName;
    process.on('beforeExit', async (code) => {
      if (this.client) await this.client.close();
      Logger.warn(`MongoDB connection closed with code ${code}`, 'MongoConnectionManager');
      process.exit(code);
    });

    process.on('SIGINT', async (code) => {
      try {
        if (this.client) await this.client.close();
        Logger.warn(`MongoDB connection closed with code ${code}`, 'MongoConnectionManager');
        process.exit();
      } catch (error) {
        Logger.error(error, 'MongoConnectionManager');
        process.exit();
      }
    });
  }

  async getDb (): Promise<mongoDB.Db> {
    this.client = await mongoDB.MongoClient.connect(this.url);
    this.db = this.client.db(this.dbName);
    return this.db;
  }
}
