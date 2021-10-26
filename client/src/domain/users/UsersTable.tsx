import { RouteProps } from "react-router";
import { Table } from "../../shared/components";
import { IUser } from "../../shared/types";

type UsersTableProps = {
  users: IUser[] | undefined;
  location: RouteProps["location"];
};

const UsersTable = ({ users = [], location }: UsersTableProps) => {
  return (
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
        {users?.map((user, index) => (
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
                  state: {
                    background: { ...location, path: "delete-user" },
                  },
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UsersTable;
