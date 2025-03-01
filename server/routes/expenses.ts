import { Hono } from 'hono';
import { z, ZodError } from 'zod';
import { zValidator } from '@hono/zod-validator';

const expenseSchema = z.object({
  id: z.number().positive().min(1),
  title: z.string().min(3).max(100), // title must be a string with at least 3 chars and a max of 100 chars
  amount: z.number().int().positive(), // amount must be an integer with a positive value
});

// Creates a new schema from expense schema but removes the id key
const createPostSchema = expenseSchema.omit({ id: true });

// Create a ts type from a zod object
// We can extract the type of any schema with z.infer<typeof schema>
type Expense = z.infer<typeof expenseSchema>;

const mockDB: Expense[] = [
  { id: 1, title: 'Groceries', amount: 50 },
  { id: 2, title: 'Electric Bill', amount: 75 },
  { id: 3, title: 'Internet Subscription', amount: 45 },
  { id: 4, title: 'Coffee', amount: 4 },
  { id: 5, title: 'Rent', amount: 1200 },
  { id: 6, title: 'Gas', amount: 40 },
  { id: 7, title: 'Movie Tickets', amount: 30 },
  { id: 8, title: 'Gym Membership', amount: 25 },
  { id: 9, title: 'Dinner Out', amount: 60 },
  { id: 10, title: 'Car Maintenance', amount: 200 },
];

// To create a new route is the same as creating a new hono app
// Below the new app we chain all of the specifies routes and http method on the api
export const expensesRouter = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: mockDB });
  })
  .get('/total-spent', (c) => {
    // Sum all of the amount values in the expenses type
    const total = mockDB.reduce((acc, curr) => acc + curr.amount, 0);

    return c.json({ total }, 200);
  })
  .post('/', zValidator('json', createPostSchema), async (c) => {
    // NOTE: zod will automatically return a 400 BAD_RESPONSE error if an incorrect schema is sent by the client
    const data = c.req.valid('json');

    mockDB.push({ id: mockDB.length + 1, ...data });
    c.status(201);
    return c.json({ message: 'Expense successfully added to mock db' });
  })
  // Regex pattern for id path parameter, can only be a positive integer
  // i.e GET -> /api/expenses/4 (should return the expense with id 4)
  .get('/:id{[0-9]+}', (c) => {
    // To get the :id from the query parameter
    const id = Number.parseInt(c.req.param('id'));

    const expense = mockDB.find((e) => e.id === id);
    if (!expense) return c.notFound();

    return c.json({ expense: expense });
  })
  // Regex pattern for id path parameter, can only be a positive integer
  // i.e DELETE -> /api/expenses/4 (should delete the expense with id 4 and return that expense)
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const idIndex = mockDB.findIndex((e) => e.id == id);
    if (idIndex === -1) return c.notFound();

    // Remove the found index from mockDB and get the removed index returned from splice
    const removedExpense = mockDB.splice(idIndex, 1)[0];

    return c.json({ expense: removedExpense });
  });
