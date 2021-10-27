import React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import toast, { Toaster } from "react-hot-toast";

import Routes from "./routes";
import AxiosProvider from "./shared/contexts/AxiosProvider";
import "./App.css";
import Sidebar from "./shared/components/Sidebar";

// Create a client
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined && error instanceof Error) {
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
      <main className="bg-main-dark">
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <Sidebar />
            <Routes />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </AxiosProvider>
      </main>
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
