import { ChatProvider } from "src/application/services/chat_provider";
import { Message, ChatType } from "../../../domain/entities/chat";
import { ChatRepository } from "../../../domain/repositories/chat_repository";

export interface CreateMessageInput {
  chatId: string;
  message: Message
}
export class CreateMessageUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatProvider: ChatProvider
  ) { }
  async execute(message: CreateMessageInput) {
    try {
      const chat = await this.chatRepository.findAndInsertMessage(message.message, message.chatId);
      if (chat.props.chatType === ChatType.person_to_bot) {
        const messageRequest = {
          messages: [{
            role: "person",
            content: message.message.content
          }]
        }
        const chatProvider = await this.chatProvider.chatCompletion(messageRequest);
        const newMessage = {

        }
      }
      return chat;
    } catch (error) {
      throw error;
    }
  }
}