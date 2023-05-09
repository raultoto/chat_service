import { ChatType, Message } from "../../../domain/entities/chat";
import { ChatRepository } from "../../../domain/repositories/chat_repository";
import { ChatProvider } from "../../services/chat_provider";

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
      if (chat.props.chatType === ChatType.personToBot) {
        const messageRequest = {
          messages: [{
            role: "person",
            content: message.message.content
          }]
        }
        const chatProvider = await this.chatProvider.chatCompletion(messageRequest);
        // ce
        console.log(chatProvider);          
      }
      return chat;
    } catch (error) {
      throw error;
    }
  }
}