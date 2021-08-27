import http from 'http';
import getConfig from './config';
import { handler } from '../interfaces/routeHandlers/default';

export const server = http.createServer(handler);
export const port = getConfig().serverPort;
