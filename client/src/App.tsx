import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';

import { api } from './lib/api';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  // Get the total expense on every page load
  useEffect(() => {
    // Immediatly invoked async function to fetch data from the api
    (async () => {
      // Make a request with the hono apr client to the expenses route
      const res = await api.expenses['total-spent'].$get();
      const data = await res.json();
      setTotalSpent(data.total);
    })();
  }, []);

  return (
    <>
      <main className="w-[350px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent>
            <p>${totalSpent}</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default App;
