import { format } from 'winston';
import { bgGreen, green, yellowBright, yellow } from 'chalk';

import { colorizeLevel, colorizeMessage } from './colorize';

export const formatReqLogMessage = () =>
  format.printf((info) => {
    const message = `${colorizeLevel(info.level || '')} ${yellow(`[${info.app}]`)} ${colorizeMessage(info.level, `[${info.route}]`)} ${info.timestamp} ${green(info.type)} ${yellow(`[${info.context}]`)} ${colorizeMessage(info.level, info.message)} ${colorizeMessage(info.level, `[${info.cid}]`)}`;

    if (process.env.NODE_ENV === 'production')
      return `${message}\n${JSON.stringify(info, null, 2)}`;

    return message;
  });

export const formatAppLogMessage = () =>
  format.printf((info) => {
    const message = `${colorizeLevel(info.level || '')} ${yellow(`[${info.app}]`)} ${info.timestamp} ${green(info.type)} ${yellow(`[${info.context}]`)} ${colorizeMessage(info.level, info.message)}`;

    if (process.env.NODE_ENV === 'production') return `${message}`;

    return message;
  });
