import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../../domain/repositories/user_repository';
import { errorResponseHandler, succeessResponseHandler } from '../../shared/utils/controller_response_handler';
import { SuccessTypes } from '../../shared/utils/error_handler';
import { Logger } from '../logger/logger';
import { UserMapper } from '../mappers/user_mapper';


/* It's a controller that handles all the requests for the user resource */
export class UserController {
  constructor (private readonly userRepository: UserRepository) { }

  /**
 * It gets a user by id
 * @param {FastifyRequest} request - FastifyRequest - This is the request object that contains all the
 * information about the request.
 * @param {FastifyReply} reply - FastifyReply - This is the reply object that will be used to send the
 * response back to the client.
 */
  async get (request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const user = await this.userRepository.findOne(request.params['id']);
      succeessResponseHandler(reply, UserMapper.fromEntity(user));
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }

  /**
 * It gets all the users from the database and sends them back to the client
 * @param {FastifyRequest} _ - FastifyRequest - This is the request object.
 * @param {FastifyReply} reply - FastifyReply - This is the reply object that is used to send the
 * response back to the client.
 */
  async getAll (_: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      Logger.info('UserController', this.constructor.name);
      const users = await this.userRepository.findAll();
      succeessResponseHandler(reply, users.map(UserMapper.fromEntity));
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }

  /**
   * It creates a new user and returns the created user
   * @param {FastifyRequest} request - FastifyRequest - This is the request object that is passed to
   * the route handler.
   * @param {FastifyReply} reply - FastifyReply - This is the reply object that is used to send the
   * response back to the client.
  * @returns The user object
   */
  async create (request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const time = new Date();
      const newUser = UserMapper.toEntity(request.body);
      const result = await this.userRepository.createOne(newUser);
      succeessResponseHandler(reply, UserMapper.fromEntity(result), SuccessTypes.CREATED, 'User created successfully');
      const time2 = new Date();
      Logger.info(`Time to create user: ${time2.getTime() - time.getTime()} ms`, this.constructor.name);
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }

  /**
   * It finds a user by id, updates the user with the new data, and returns the updated user
   * @param {FastifyRequest} request - FastifyRequest - This is the request object that contains all
   * the information about the request.
   * @param {FastifyReply} reply - FastifyReply - This is the reply object that is used to send the
   * response back to the client.
   * @returns The user object
   */
  async update (request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const user = await this.userRepository.findOne(request.params['id']);
      const newUser = UserMapper.updateEntity(request.body, user);
      const result = await this.userRepository.updateOne(newUser);
      succeessResponseHandler(reply, UserMapper.fromEntity(result));
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }

  /**
  * It deletes a user from the database
  * @param {FastifyRequest} request - FastifyRequest - This is the request object that contains the
  * request data.
  * @param {FastifyReply} reply - FastifyReply - This is the reply object that will be used to send the
  * response back to the client.
  * @returns true or error
  */
  async delete (request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      await this.userRepository.deleteOne(request.params['id']);
      succeessResponseHandler(reply, { delete: true }, SuccessTypes.SUCCESS, 'User deleted successfully');
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }
}
