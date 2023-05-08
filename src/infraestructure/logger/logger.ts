import pino from 'pino';
export const transportDefinition = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-MM-dd HH:mm:ss'
    }
  }
};
export interface LoggerI {
  info(data: any, context: string): void;
  error(data: any, context: string): void;
  warn(data: any, context: string): void;
}
class PinoLogger implements LoggerI {
  logger = pino(transportDefinition);

  info (data: any, context: string): void {
    this.logger.info(data, context);
  }

  error (data: any, context: string): void {
    this.logger.error(data, context);
  }

  warn (data: any, context: string): void {
    this.logger.warn(data, context);
  }
}
// create a singleton instance for LoggerI
export class LoggerSingleton {
  private static instance: LoggerI;
  private constructor () {}
  static getInstance (): LoggerI {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new PinoLogger();
    }
    return LoggerSingleton.instance;
  }
}
export const Logger = LoggerSingleton.getInstance();
