import { Route, Switch, useLocation } from "react-router-dom";

import {
  CreateUser,
  EditUser,
  PaginatedQuery,
  InfiniteQuery,
  BasicQuery,
  LocalQuery,
} from "./pages";
import DeleteUser from "./pages/DeleteUser";

const Routes = () => {
  let location = useLocation();

  // This piece of state is set when one of the
  // The `background` state
  // is the location that we were at when one of
  // the links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the parent in the background, behind
  // the modal.
  let background = location?.state?.background;

  return (
    <div className="flex justify-center h-screen max-w-screen-lg mx-auto">
      <Switch location={background || location}>
        <Route path="/" exact>
          <BasicQuery />
        </Route>
        <Route path="/paginated">
          <PaginatedQuery />
        </Route>
        <Route path="/infinite">
          <InfiniteQuery />
        </Route>
        <Route path="/local">
          <LocalQuery />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background?.path === "create-user" && (
        <Route path="/user/create" children={<CreateUser />} />
      )}
      {background?.path === "edit-user" && (
        <Route path="/user/edit/:id" children={<EditUser />} />
      )}
      {background?.path === "delete-user" && (
        <Route path="/user/delete/:id" children={<DeleteUser />} />
      )}
    </div>
  );
};

export default Routes;
