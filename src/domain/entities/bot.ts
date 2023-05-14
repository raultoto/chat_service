import { DateTime } from "luxon";
import { Entity } from "src/shared/core/entity";

interface VoiceCloneOf {
  originPersonName: string;
  originPersonId: string;
}

interface LanguageSkills {
  listening: string;
  speaking: string;
  reading: string;
  writing: string;
}

interface MachineLearningSkills {
  nlp: string;
  voiceRecognition: string;
  voiceSynthesis: string;
}

interface InteractionSettings {
  maxResponseTime: number;
  minConfidence: number;
}

interface Owner {
  ownerType: string;
  ownerId: string;
}

interface BotProps {
  botId: string;
  botName: string;
  avatarUrl: string;
  model: string;
  status: string;
  interactionType: string;
  voiceCloneOf: VoiceCloneOf;
  languageSkills: LanguageSkills;
  machineLearningSkills: MachineLearningSkills;
  interactionSettings: InteractionSettings;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
}

export class Bot extends Entity<BotProps> {
  constructor (props: BotProps) {
    props.createdAt = props.createdAt ?? DateTime.now().toISO();
    props.updatedAt = DateTime.now().toISO();
    super(props, props.botId);
  }
}
