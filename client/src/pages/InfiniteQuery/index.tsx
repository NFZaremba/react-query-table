import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { Table } from "../../shared/components";
import { Heading, Button } from "@chakra-ui/react";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { createUrl } from "../../shared/utils/createUrl";
import { IData } from "../../shared/types";
import { parseLinkHeader } from "../../shared/utils/parseLinkHeader";

const PAGE_LIMIT = 10;

const useFetchInfiniteUsers = () => {
  const axios = useAxios();

  return useInfiniteQuery(
    "users",
    async ({ pageParam = 1 }) => {
      const url = createUrl({ page: pageParam, pageLimit: PAGE_LIMIT });
      const user = await axios.get<IData[]>(url);
      return { data: user.data, headers: user.headers };
    },
    {
      getNextPageParam: (lastPage) => {
        // The following code block is specific to json-server api
        const nextPageUrl = parseLinkHeader(lastPage?.headers?.link)["next"];
        if (nextPageUrl) {
          const queryString = nextPageUrl.substring(
            nextPageUrl.indexOf("?"),
            nextPageUrl.length
          );
          const urlParams = new URLSearchParams(queryString);
          const nextPage = urlParams.get("_page");
          return nextPage;
        } else {
          return undefined;
        }
      },
      select: (data) => {
        // flatten data array
        return { ...data, pages: data?.pages?.flatMap((page) => page.data) };
      },
    }
  );
};

const InfiniteQuery = () => {
  const location = useLocation();

  const users = useFetchInfiniteUsers();

  return (
    <>
      <Heading mb={4}>Infinite Query Example</Heading>
      <div>
        {users.isFetchingNextPage && <div>Fetching Next Page...</div>}
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
        <Table
        // size="md"
        >
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
            {users?.data?.pages?.map((user, index) => (
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
                      state: {
                        background: { ...location, path: "delete-user" },
                      },
                    }}
                  />
                </Table.Actions>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Button
        mt={6}
        colorScheme="teal"
        onClick={() => users.fetchNextPage()}
        disabled={!users.hasNextPage || users.isFetchingNextPage}
      >
        Load More...
      </Button>
    </>
  );
};

export default InfiniteQuery;
