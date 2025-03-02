import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';

import { api } from './lib/api';
import { useQuery } from '@tanstack/react-query';

async function getTotalSpent() {
  // Test a long wait time from the server
  // await new Promise((r) => setTimeout(r, 5000));

  // Make a request with the hono rpc api client to the expenses route
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) throw new Error('Something went wrong on the server.');
  return await res.json();
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['totalSpent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error occurred';

  return (
    <>
      <main className="w-[350px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? <p>Loading...</p> : <p>${data?.total}</p>}
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default App;
