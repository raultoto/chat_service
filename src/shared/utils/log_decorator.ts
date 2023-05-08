import { DateTime } from 'luxon';
import { Logger } from '../../infraestructure/logger/logger';
import { config } from '../../bootstrap/config';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames (method) {
  const methodString = method.toString().replace(STRIP_COMMENTS, '');
  let result = methodString.slice(methodString.indexOf('(') + 1, methodString.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) { result = []; }
  return result;
}

export const logDecorator = (target, name, descriptor) => {
  const originalMethod = descriptor.value;

  if (typeof originalMethod === 'function') {
    const paramNames = getParamNames(originalMethod);
    descriptor.value = async function (...args) {
      const methodArguments = paramNames.reduce((names, name, i) => {
        names[name] = args[i];
        return names;
      }, {});
      try {
        const data = await originalMethod.apply(this, args);
        const result = {
          serviceName: config.serviceName,
          executedClass: target.constructor.name,
          executedMethod: name,
          arguments: methodArguments,
          result: data,
          timestamp: DateTime.now().toISO()
        };
        Logger.info(result, target.constructor.name);
        return data;
      } catch (error) {
        const executionError = {
          serviceName: config.serviceName,
          executedClass: target.constructor.name,
          executedMethod: name,
          arguments: methodArguments,
          error,
          timestamp: DateTime.now().toISO()
        };
        Logger.error(executionError, target.constructor.name);
        throw error;
      }
    };
  }
};
