import { Bot } from "../../domain/entities/bot";
import { BotRepository } from "../../domain/repositories/bot_repository";

export class MongoDbBotRepository implements BotRepository{
  createOne(bot: Bot): Promise<Bot> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<Bot> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Bot[]> {
    throw new Error("Method not implemented.");
  }
  updateOne(bot: Bot): Promise<Bot> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}