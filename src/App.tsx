import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Main } from "pages/Main";
import { SearchProvider } from "context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <Main />
    </SearchProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default App;
