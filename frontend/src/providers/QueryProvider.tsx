import { QueryClient, QueryClientProvider } from "react-query";
import { FC } from "react";
import { QueryProviderProps } from "../interface/QueryProvider/QueryProvider";

const queryClient = new QueryClient();

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
