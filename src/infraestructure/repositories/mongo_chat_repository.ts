import { Collection, Db } from 'mongodb';
import { Chat, Message } from '../../domain/entities/chat';
import { ChatRepository } from '../../domain/repositories/chat_repository';
import { Logger } from '../logger/logger';
import { ChatMapper } from '../mappers/chat_mapper';


export class MongoChatRepository implements ChatRepository {
  private readonly _collection: Collection;
  constructor(db: Db) {
    this._collection = db.collection('chat');
    const indexName = 'chatid_index';
    this._collection.indexExists(indexName).then((indexExists) => {
      if (!indexExists) {
        this._collection.createIndex({ chatId: 1 }, { unique: true, name: indexName });
      }
    });
  }
  async insertMessage(message: Message, chatId: string): Promise<Message> {
    try {
      await this._collection.updateOne(
        { chatId },
        { $push: { messages: message as never } }
      )
      return message;
    } catch (error) {
      throw error;
    }
  }
  async findAndInsertMessage(message: Message, chatId: string): Promise<Chat> {
    try {
      const result = await this._collection.findOneAndUpdate(
        { chatId }, 
        { $push: { messages: message as never } },
        { upsert: true, returnDocument: 'after'}
      )
      return ChatMapper.toEntity(result.value);
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }
  async createOne(chat: Chat): Promise<Chat> {
    try {
      const chatJson = ChatMapper.fromEntity(chat);
      await this._collection.insertOne(chatJson);
      return chat;
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }
  findOne(id: string): Promise<Chat> {
    console.log(id)
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Chat[]> {
    throw new Error('Method not implemented.');
  }
  updateOne(chat: Chat): Promise<Chat> {
    console.log(chat)
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<boolean> {
    console.log(id)
    throw new Error('Method not implemented.');
  }

}