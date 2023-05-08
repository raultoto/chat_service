import { ErrorHandler } from './../../shared/utils/error_handler';
import { Collection, Db } from 'mongodb';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user_repository';
import { UserMapper } from '../mappers/user_mapper';
import { Logger } from '../logger/logger';

/* It's a class that implements the UserRepository interface and uses MongoDB as the data store */
export class MongoDBUserRepository implements UserRepository {
  private readonly _model: Collection;

  constructor (db: Db) {
    this._model = db.collection('user');
    const indexName = 'user_id_index';
    this._model.indexExists(indexName).then((indexExists) => {
      if (!indexExists) {
        this._model.createIndex({ id: 1 }, { unique: true, name: indexName });
      }
    });
  }

  async deleteOne (id: string): Promise<boolean> {
    try {
      const result = await this._model.deleteOne({ id });
      if (result.deletedCount === 0) {
        throw ErrorHandler.NOT_FOUND('User not found');
      }
      return true;
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }

  async createOne (user: User): Promise<User> {
    try {
      const userJson = UserMapper.fromEntity(user);
      await this._model.insertOne(userJson);
      return user;
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }

  async findOne (id: string): Promise<User> {
    try {
      const result = await this._model.findOne({ id });
      if (!result) {
        throw ErrorHandler.NOT_FOUND('User not found');
      }
      return UserMapper.toEntity(result);
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }

  async findAll (): Promise<User[]> {
    try {
      // meassure time
      const users = await this._model.find({}).toArray();
      return users.map(UserMapper.toEntity);
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }

  async updateOne (user: User): Promise<User> {
    try {
      await this._model.updateOne({ id: user.id }, { $set: UserMapper.fromEntity(user) }, { upsert: true });
      return user;
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }
}
