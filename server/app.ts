import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRouter } from './routes/expenses';

const app = new Hono();

// Setup an initialize middlewares
app.use(logger()); // matches any method and any route i.e global logging

// Setup Hono endpoints
// Register the routes defined in expesesRouter to /api/expenses
const apiRoutes = app.basePath('/api').route('/expenses', expensesRouter);

// change port number and server configs
// export default {
//   port: 8080,
//   fetch: app.fetch,
// };

export default app;
// Export so hono rpc can recevie access to the client side
export type ApiRoutes = typeof apiRoutes;
