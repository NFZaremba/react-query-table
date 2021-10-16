import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { Table } from "../../components";
import { Button, Heading } from "@chakra-ui/react";
import { fetchAllUsers } from "../../services/users";

const PAGE_LIMIT = 10;

const BasicQuery = () => {
  const location = useLocation();

  const users = useQuery("users", fetchAllUsers, {
    select: ({ data }) => {
      return data.slice(0, PAGE_LIMIT);
    },
  });

  return (
    <>
      <Heading mb={4}>Basic Query Example</Heading>
      <Link
        to={{
          pathname: "/user/create",
          state: { background: { ...location, path: "create-user" } },
        }}
      >
        <Button colorScheme="teal" mb={4}>
          Create User
        </Button>
      </Link>

      <Table size="md">
        <Table.Head>
          <Table.Row>
            <Table.Header>Id</Table.Header>
            <Table.Header>First Name</Table.Header>
            <Table.Header>Last Name</Table.Header>
            <Table.Header>Email</Table.Header>
            <Table.Header>Gender</Table.Header>
            <Table.Header>Action</Table.Header>
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
              <Table.Actions>
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
              </Table.Actions>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default BasicQuery;
