import axios, { AxiosRequestConfig } from "axios";
import { Logger } from "../../infraestructure/logger/logger";

interface IChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}
interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  choices: IChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
interface MessageRequest {
  messages: {
    role: string;
    content: string;
  }[];
}

export interface ChatProvider {
  chatCompletion(messageRequest: MessageRequest): Promise<ChatCompletion>;
}

export class GptChatProvider implements ChatProvider {
  private config: AxiosRequestConfig;
  constructor() {
    this.config = {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
    };
  }
  async chatCompletion(messageRequest: MessageRequest): Promise<ChatCompletion> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: messageRequest.messages
    }

    try {
      const response = await axios.post(
        this.config.url,
        data,
        {
          headers: this.config.headers
        }
      );
      return response.data as ChatCompletion; // choose the first choice
    } catch (error) {
      Logger.error(error, this.constructor.name);
      throw error;
    }
  }
}