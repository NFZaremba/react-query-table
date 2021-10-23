import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { Table } from "../../shared/components";
import { Button } from "@chakra-ui/react";
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
    <div className="w-full">
      <h1 className="bold text-4xl mb-8">Infinite Query Example</h1>
      <div>
        {users.isFetchingNextPage && <div>Fetching Next Page...</div>}
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
            {users?.data?.pages?.map((user, index) => (
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
      </div>

      <button
        className="btn mt-8"
        onClick={() => users.fetchNextPage()}
        disabled={!users.hasNextPage || users.isFetchingNextPage}
      >
        Load More...
      </button>
    </div>
  );
};

export default InfiniteQuery;
