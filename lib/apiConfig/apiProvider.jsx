import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const defaultQueryOptions = {
  queries: {
    staleTime: 0,
    retry: 1,
    notifyOnStatusChange: false,
    refetchOnWindowFocus: false
  }
};

const queryClient = new QueryClient({ defaultOptions: defaultQueryOptions });

export const ApiProvider = (props) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

export default ApiProvider;
