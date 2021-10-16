import React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast, { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

import { Navbar } from "./layout";
import Routes from "./routes";

// Create a client
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ChakraProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <QueryClientProvider client={queryClient}>
            <Routes />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </main>
      </ChakraProvider>
      {/* Toast  */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#515151",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </React.Fragment>
  );
};

export default App;
