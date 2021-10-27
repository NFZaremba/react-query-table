import { Link, RouteProps } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import GridTable from "../../shared/components/GridTable";
import { IUser } from "../../shared/types";

type UsersGridProps = {
  users: IUser[] | undefined;
  location: RouteProps["location"];
};

const UserGrid = ({ users = [], location }: UsersGridProps) => (
  <div className="">
    <GridTable>
      {users.map((user, index) => (
        <div
          key={`${user.id + index}`}
          className="bg-white p-4 whitespace-nowrap rounded-lg flex flex-col justify-center items-center"
        >
          <GridTable.Header>Id: {user.id}</GridTable.Header>
          <GridTable.Text>
            {user.first_name} {user.last_name}
          </GridTable.Text>
          <GridTable.Text>{user.email}</GridTable.Text>
          <div>
            <Link
              to={{
                pathname: `/user/edit/${user.id}`,
                state: { background: { ...location, path: "edit-user" } },
              }}
            >
              <button className="btn-ghost">
                <EditIcon />
              </button>
            </Link>
            <Link
              to={{
                pathname: `/user/delete/${user.id}`,
                state: {
                  background: { ...location, path: "delete-user" },
                },
              }}
            >
              <button className="btn-ghost">
                <DeleteIcon />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </GridTable>
  </div>
);

export default UserGrid;
