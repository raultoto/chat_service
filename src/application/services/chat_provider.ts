import axios, { AxiosRequestConfig } from "axios";

interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
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
  constructor(){}
  async chatCompletion(messageRequest: MessageRequest): Promise<ChatCompletion> {
    const config: AxiosRequestConfig = {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: messageRequest.messages
      }
    };

    try {
      const response = await axios.post(
        config.url,
        config.data,
        {
          headers: config.headers
        }
      );
      return response.data.choices[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}