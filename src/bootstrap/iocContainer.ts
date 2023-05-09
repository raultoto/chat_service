import Bottle from 'bottlejs';
import { Db } from 'mongodb';
import { GptChatProvider } from '../application/services/chat_provider';
import { CreateChatSessionUseCase } from '../application/usecases/chat/create_chat_session_usecase';
import { CreateMessageUseCase } from '../application/usecases/message/create_message_usecase';
import { ChatController } from '../infraestructure/controllers/chat_controller';
import { UserController } from '../infraestructure/controllers/user_controller';
import { MongoChatRepository } from '../infraestructure/repositories/mongo_chat_repository';
import { MongoDBUserRepository } from '../infraestructure/repositories/mongodb_user_repository';

export interface Dependency {
  database: Db,
}
const bottle = new Bottle();
export const createContainer = (instance: Dependency) => {
  bottle.factory('db', () => instance.database);
  // Repositories
  bottle.service('UserRepository', MongoDBUserRepository, 'db');
  bottle.service('ChatRepository', MongoChatRepository, 'db');
  // services
  bottle.service('ChatProvider', GptChatProvider);

  // usecases
  bottle.service('CreateChatSessionUseCase', CreateChatSessionUseCase, 'ChatRepository');
  bottle.service('CreateMessageUseCase', CreateMessageUseCase, 'ChatRepository','ChatProvider');
  // Controllers
  bottle.service('UserController', UserController, 'UserRepository');
  bottle.service('ChatController', ChatController, 'CreateChatSessionUseCase','CreateMessageUseCase');
};
export default bottle.container;
