import { Chat, Message } from "../entities/chat";

export interface ChatRepository {
  createOne(chat: Chat): Promise<Chat>;
  findAndInsertMessage(message: Message, chatId: string): Promise<Chat>
  insertMessage(message: Message, chatId: string): Promise<Message>;
  findOne(id: string): Promise<Chat>;
  findAll(): Promise<Chat[]>;
  updateOne(chat: Chat): Promise<Chat>;
  deleteOne(id: string): Promise<boolean>;
}