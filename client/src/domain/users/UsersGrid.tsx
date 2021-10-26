import { Link, RouteProps } from "react-router-dom";
import EditIcon from "../../icons/EditIcon";
import { IUser } from "../../shared/types";

type UsersGridProps = {
  users: IUser[] | undefined;
  location: RouteProps["location"];
};

const UserGrid = ({ users = [], location }: UsersGridProps) => {
  return (
    <div className="">
      <div className="min-w-full grid grid-cols-users gap-4 overflow-y-scroll overflow-x-scroll h-[calc(100vh-20rem)]">
        {users.map((user, index) => (
          <div
            key={`${user.id + index}`}
            className="bg-white p-4 whitespace-nowrap rounded-lg"
          >
            <h2 className="">{user.id}</h2>
            <p className="company-name">
              {user.first_name} {user.last_name}
            </p>
            <p>{user.email}</p>
            <div className="user-posts-link">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
