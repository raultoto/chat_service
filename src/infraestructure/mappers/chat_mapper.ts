import { Chat } from "../../domain/entities/chat";

export class ChatMapper {

  static fromEntity(chat: Chat) {
    return {
      chatId: chat.id,
      description: chat.props.description,
      language: chat.props.language,
      userProficiencyLevel: chat.props.userProficiencyLevel,
      participants: chat.props.participants,
      messages: chat.props.messages,
      resources: chat.props.resources,
      chatHistory: chat.props.chatHistory,
      createdAt: chat.props.createdAt,
      updatedAt: chat.props.updatedAt,
      chatType: chat.props.chatType,
    };
  }

  static toEntity(json: any): Chat {
    return new Chat({
      chatId: json.chatId,
      description: json.description,
      language: json.language,
      userProficiencyLevel: json.userProficiencyLevel,
      participants: json.participants,
      messages: json.messages,
      resources: json.resources,
      chatHistory: json.chatHistory,
      createdAt: json.createdAt,
      chatType: json.chatType,
    });
  }
  
}