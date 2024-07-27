import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      notifyOnStatusChange: false,
      refetchOnWindowFocus: false
    }
  }
});

export const ApiProvider = (props) => <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;

export default ApiProvider;
