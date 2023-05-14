import { EventEmitter } from 'events';
import { BotParticipant, ChatType, ContentType, Message, Participant, ParticipantType } from "../../../domain/entities/chat";
import { ChatRepository } from "../../../domain/repositories/chat_repository";
import { ChatGptRole } from '../../../shared/constants/chat_provider';
import { ChatProvider } from "../../services/chat_provider";

export interface CreateMessageInput {
  chatId: string;
  message: Message
}

export class CreateMessageUseCase extends EventEmitter {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatProvider: ChatProvider
  ) {
    super();
  }

  async execute(message: CreateMessageInput) {
    try {
      let chat = await this.chatRepository.findAndInsertMessage(message.message, message.chatId);
      const chatHandler = {
        [ChatType.personToBot]: this.personToBotChatCompletion.bind(this),
        [ChatType.personToPerson]: () => { },
        [ChatType.group]: () => { },
        [ChatType.mixed]: () => { },
      }
      chatHandler[chat.props.chatType](message, chat.props.participants)
      return chat;
    } catch (error) {
      throw error;
    }
  }
  personToBotChatCompletion(message: CreateMessageInput, participants: Participant[]) {
    const emisor = participants.filter(participant => participant.type === ParticipantType.bot).pop() as BotParticipant;
    const messageRequest = {
      messages: [{
        role: ChatGptRole.USER,
        content: message.message.content
      }]
    }
    this.chatProvider.chatCompletion(messageRequest)
      .then(async chatProvider => {
        const messageResponse = chatProvider.choices.pop();
        const newMessage: Message = this.newMessage(
          {
            type: ParticipantType.bot,
            id: emisor.botId
          }, 
          messageResponse.message.content
        );
        await this.chatRepository.findAndInsertMessage(newMessage, message.chatId);
        this.emit('personToBot', newMessage);
      })
      .catch(error => {
        console.error(error);
      });
  }
  newMessage(sender: { type: ParticipantType, id: string }, content: string) {
    return {
      sender: sender,
      contentType: ContentType.text,
      content: content,
      timestamp: new Date().toISOString(),
      correction: "",
      attachments: [],
      reactions: [],
    }
  }
}
