import { ChatMapper } from "../../../infraestructure/mappers/chat_mapper";
import { Chat, ChatType, Participant, ProficiencyLevel } from "../../../domain/entities/chat";
import { ChatRepository } from "../../../domain/repositories/chat_repository";

export interface CreateChatSessionInput {
  description: string;
  language: string;
  userProficiencyLevel: ProficiencyLevel;
  participants: Participant[];
  chatType: string;
}
export class CreateChatSessionUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
  ) {
  }
  // @logDecorator
  async execute(input: CreateChatSessionInput) {
    const chat = new Chat({
      description: input.description,
      language: input.language,
      userProficiencyLevel: input.userProficiencyLevel,
      participants: input.participants,
      messages: [],
      resources: [],
      chatHistory: [],
      chatType:input.chatType as ChatType,
    });
    const chatCreated = await this.chatRepository.createOne(chat);
    return ChatMapper.fromEntity(chatCreated);
  }
}
