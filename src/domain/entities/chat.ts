import { Entity } from "../../shared/core/entity";

type ISODate = string;

enum ParticipantType {
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
enum ContentType {
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
  message_added = 'message_added',
  message_deleted = 'message_deleted',
  message_edited = 'message_edited',
  participant_added = 'participant_added',
  participant_removed = 'participant_removed',
  resource_added = 'resource_added',
  resource_updated = 'resource_updated'
} 
enum ChatBotModel{
  gpt_api = 'gpt_api',
  other_model = 'other_model'
}
export enum ChatType{
  person_to_bot = 'person_to_bot',
  person_to_person = 'person_to_person',
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
