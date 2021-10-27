import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Header, Table } from "../../shared/components";
import { useState } from "react";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { IUser } from "../../shared/types";
import { useRouter } from "../../shared/hooks/useRouter";
import { useIsLarge } from "../../shared/hooks/useMediaQuery";
import UsersTable from "../../domain/users/UsersTable";
import UserGrid from "../../domain/users/UsersGrid";

const useFetchUsers = (limit: number) => {
  const axios = useAxios();

  return useQuery(
    "users",
    async (): Promise<IUser[]> => {
      const { data } = await axios.get<IUser[]>("/users");
      return data;
    },
    {
      select: (users) => {
        if (!Array.isArray(users)) return;
        return users?.slice(0, limit);
      },
    }
  );
};

const BasicQuery = () => {
  const { location } = useRouter();
  const [limit, setLimit] = useState<number>(15);
  const users = useFetchUsers(limit);
  const isLarge = useIsLarge();

  console.log("main", location);

  return (
    <div className="section">
      <Header>Basic Query</Header>
      <div className="flex justify-between align-items mb-8">
        <Link
          to={{
            pathname: "/user/create",
            state: { background: { ...location, path: "create-user" } },
          }}
        >
          <button className="btn">Create User</button>
        </Link>
        <Table.SelectLimit
          label="Select limit:"
          id="Select Limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          options={[
            {
              value: 15,
              label: "15",
            },
            {
              value: 50,
              label: "50",
            },
            {
              value: 100,
              label: "100",
            },
          ]}
        />
      </div>
      {isLarge ? (
        <UsersTable users={users?.data} location={location} />
      ) : (
        <UserGrid users={users?.data} location={location} />
      )}
    </div>
  );
};

export default BasicQuery;
