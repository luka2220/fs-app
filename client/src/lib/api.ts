import { hc } from 'hono/client';
// Import the type from server code
import { type ApiRoutes } from '@server/app';

const client = hc<ApiRoutes>('/'); // / since both client and server are on the same origin

export const api = client.api;
