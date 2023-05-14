import { Bot } from "../entities/bot";

export interface BotRepository {
  createOne(bot: Bot): Promise<Bot>;
  findOne(id: string): Promise<Bot>;
  findAll(): Promise<Bot[]>;
  updateOne(bot: Bot): Promise<Bot>;
  deleteOne(id: string): Promise<boolean>;
}
