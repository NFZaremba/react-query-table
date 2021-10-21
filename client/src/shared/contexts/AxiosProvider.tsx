import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useMemo } from "react";
import { getBaseUrl } from "../utils/getBaseUrl";

export const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("Axios context cannot be used outside its provider");
  }
  return context;
};

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const value = useMemo(() => {
    const instance = axios.create({
      baseURL: getBaseUrl(),
      headers: {
        "Content-Type": "application/json",
        // add any authorizations here
      },
      // add interceptor request here

      // add interceptor response here
    });

    return instance;
  }, []);

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export default AxiosProvider;
