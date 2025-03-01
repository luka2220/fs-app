import app from './app';

Bun.serve({
  // configures http requests to be handled by hono
  fetch: app.fetch,
});

console.log('Bun server running');
