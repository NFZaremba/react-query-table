import { useMemo } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import queryString from "query-string";

export interface IRouteState {
  background: {
    pathname: string;
  };
}

export const useRouter = <
  TParam = unknown,
  THistory = unknown,
  TLocation = unknown,
  TMatch = unknown
>() => {
  const params = useParams<TParam>();
  const history = useHistory<THistory & IRouteState>();
  const location = useLocation<TLocation>();
  const match = useRouteMatch<TMatch>();

  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    const prevPath = history.location.state?.background.pathname ?? "/";

    return {
      // For convenience add push(), replace(), pathname at top level
      goBack: () => history.replace(prevPath),
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
};
