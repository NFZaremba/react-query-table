import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Table } from "../../shared/components";
import { useState } from "react";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { IData } from "../../shared/types";
import { useRouter } from "../../shared/hooks/useRouter";

const useFetchUsers = (selected: string) => {
  const axios = useAxios();

  return useQuery(
    "users",
    async (): Promise<IData[]> => {
      const { data } = await axios.get<IData[]>("/users");
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

  return (
    <div className="w-full">
      <h1 className="bold text-4xl mb-8">Basic Query Example</h1>
      <Link
        to={{
          pathname: "/user/create",
          state: { background: { ...location, path: "create-user" } },
        }}
      >
        <button className="btn mb-8">Create User</button>
      </Link>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header className="w-1/12">Id</Table.Header>
            <Table.Header>First Name</Table.Header>
            <Table.Header>Last Name</Table.Header>
            <Table.Header className="w-3/12">Email</Table.Header>
            <Table.Header>Gender</Table.Header>
            <Table.Header>
              <span className="sr-only">Action</span>
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users?.data?.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.first_name}</Table.Cell>
              <Table.Cell>{user.last_name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.gender}</Table.Cell>
              <Table.Cell>
                <Table.ActionEdit
                  to={{
                    pathname: `/user/edit/${user.id}`,
                    state: { background: { ...location, path: "edit-user" } },
                  }}
                />
                <Table.ActionDelete
                  to={{
                    pathname: `/user/delete/${user.id}`,
                    state: { background: { ...location, path: "delete-user" } },
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <label>
        Select limit:
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value={"15"}>15</option>
          <option value={"30"}>30</option>
          <option value={"50"}>50</option>
          <option value={"100"}>100</option>
          <option value={"All"}>All</option>
        </select>
      </label>
    </div>
  );
};

export default BasicQuery;
