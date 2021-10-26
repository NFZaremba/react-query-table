import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Header, Table } from "../../shared/components";
import { useState } from "react";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { IData, IUser } from "../../shared/types";
import { useRouter } from "../../shared/hooks/useRouter";
import { useIsLarge } from "../../shared/hooks/useMediaQuery";
import UsersTable from "../../domain/users/UsersTable";
import UserGrid from "../../domain/users/UsersGrid";

const useFetchUsers = (selected: string) => {
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
        if (selected === "All") return users;
        return users?.slice(0, Number(selected));
      },
    }
  );
};

const BasicQuery = () => {
  const { location } = useRouter();
  const [selected, setSelected] = useState<string>("15");
  const users = useFetchUsers(selected);
  const isLarge = useIsLarge();

  console.log("main", location);

  return (
    <div className="section">
      <Header>Basic Query</Header>
      <Link
        to={{
          pathname: "/user/create",
          state: { background: { ...location, path: "create-user" } },
        }}
      >
        <button className="btn mb-8">Create User</button>
      </Link>
      {isLarge ? (
        <UsersTable users={users?.data} location={location} />
      ) : (
        <UserGrid users={users?.data} location={location} />
      )}
      <Table.SelectLimit
        label="Select limit:"
        id="Select Limit"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        options={[
          {
            value: "15",
            label: "15",
          },
          {
            value: "30",
            label: "30",
          },
          {
            value: "50",
            label: "50",
          },
          {
            value: "100",
            label: "100",
          },
          {
            value: "All",
            label: "All",
          },
        ]}
      />
    </div>
  );
};

export default BasicQuery;
