import { Entity } from "../../shared/core/entity";

type ISODate = string;

export enum ParticipantType {
  person = 'person',
  bot = 'bot'
}

enum UserStatus {
  online = 'online',
  offline = 'offline',
}
export enum ProficiencyLevel {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}
export enum ContentType {
  text = 'text',
  audio = 'audio',
}
enum AttachmentType {
  image = 'image',
  video = 'video',
  audio = 'audio',
  file = 'file',
}
enum ResourceType {
  lesson = 'lesson',
  exercise = 'exercise',
  quiz = 'quiz',
  article = 'article',
  video = 'video',
}
enum ChatHistoryAction{
  messageAdded = 'message_added',
  messageDeleted = 'message_deleted',
  messageEdited = 'message_edited',
  participantAdded = 'participant_added',
  participantRemoved = 'participant_removed',
  resourceAdded = 'resource_added',
  resourceUpdated = 'resource_updated'
} 
enum ChatBotModel{
  gptApi = 'gpt_api',
  otherModel = 'other_model'
}
export enum ChatType{
  personToBot = 'person_to_bot',
  personToPerson = 'person_to_person',
  group = 'group',
  mixed = 'mixed'
} 
interface LanguageSkills {
  listening: ProficiencyLevel;
  speaking: ProficiencyLevel;
  reading: ProficiencyLevel;
  writing: ProficiencyLevel;
}

interface PersonParticipant {
  type: ParticipantType;
  userId: string;
  username: string;
  avatarUrl: string;
  status: UserStatus;
}

interface BotParticipant {
  type: ParticipantType;
  botId: string;
  botName: string;
  avatarUrl: string;
  model: ChatBotModel;
  languageSkills: LanguageSkills;
}

export type Participant = PersonParticipant | BotParticipant;

interface Attachment {
  type: AttachmentType;
  url: string;
  thumbnailUrl: string;
  size: number;
}

interface Reaction {
  userId: string;
  emoji: string;
}

interface Audio {
  url: string;
  duration: number;
  transcription: string;
  language: string;
  confidence: number;
  pronunciationAnalysis: {
    score: number;
    feedback: string;
  };
}

export interface Message {
  messageId?: string;
  timestamp?: string;
  sender: {
    type: ParticipantType;
    id: string;
  };
  contentType: ContentType;
  content: string;
  correction: string;
  audio?: Audio;
  attachments: Attachment[];
  reactions: Reaction[];
}

export interface Resource {
  resourceId: string;
  type: ResourceType;
  title: string;
  url: string;
  difficulty: ProficiencyLevel;
  completed: boolean;
}

export interface ChatHistory {
  timestamp: ISODate;
  action: ChatHistoryAction;
  details: string;
}

interface ChatProps {
  chatId?: string;
  chatType: ChatType;
  description: string;
  language: string;
  userProficiencyLevel: ProficiencyLevel;
  participants: Participant[];
  messages: Message[];
  resources: Resource[];
  chatHistory: ChatHistory[];
  createdAt?: string;
  updatedAt?: string;
}
export class Chat extends Entity<ChatProps> {
  constructor(props: ChatProps) {
    props.createdAt = props.createdAt ?? new Date().toISOString();
    props.updatedAt = new Date().toISOString();
    super(props, props.chatId);
  }
}
