export const getBaseUrl = () => {
  let baseUrl = process.env.REACT_APP_FRONTEND_URI_PROD;

  if (process.env.NODE_ENV === "development")
    baseUrl = process.env.REACT_APP_FRONTEND_URI_DEV;

  return baseUrl;
};
