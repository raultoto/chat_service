import {  Message } from "../../../domain/entities/chat";
import { ChatRepository } from "../../../domain/repositories/chat_repository";
import { ChatProvider } from "../../services/chat_provider";
import { ParticipantType, ContentType } from "../../../domain/entities/chat";
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
      let chat = await this.chatRepository.findAndInsertMessage(message.message, message.chatId);

      // if (chat.props.chatType === ChatType.personToBot) {
        const messageRequest = {
          messages: [{
            role: "person",
            content: message.message.content
          }]
        }

        const chatProvider = await this.chatProvider.chatCompletion(messageRequest);
        const messageResponse = chatProvider.choices[0]
        const newMessage: Message = {
          sender: {
            type: ParticipantType.bot,
            id: chatProvider.id,
          },
          contentType: ContentType.text,
          content: messageResponse.message.content,
          timestamp: new Date().toISOString(),
          correction: "",
          attachments: [],
          reactions: [],
        }

        chat = await this.chatRepository.findAndInsertMessage(newMessage, message.chatId);
      // }

      return chat;
    } catch (error) {
      throw error;
    }
  }
}