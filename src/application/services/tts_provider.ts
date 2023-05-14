export interface GenerateAudioResponse {
  id: string;
  created: string;
  input: {
    text: string;
    voice: string;
    quality: string;
    output_format: string;
    speed: number;
    sample_rate: number;
    seed: number;
  };
  output: {
    duration: number;
    size: number;
    url: string;
  };
  _links: string[];
}
export interface VoiceCloneSource {
  file: Blob; // A Blob object represents the .wav file data
  voice_name: string;
}
export interface VoiceCloneResponse {
  id: string;
  name: string;
  type: string;
}


export interface TtsProvider {
  generateAudio(text: string): Promise<GenerateAudioResponse>;
  voiceClone(source: VoiceCloneSource): Promise<VoiceCloneResponse>;
}

export class PlayHt implements TtsProvider {
  generateAudio(text: string): Promise<GenerateAudioResponse> {
    throw new Error("Method not implemented.");
  }
  voiceClone(source: VoiceCloneSource): Promise<VoiceCloneResponse> {
    throw new Error("Method not implemented.");
  }
}