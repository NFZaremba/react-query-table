import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { Header } from "../../shared/components";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { createUrl } from "../../shared/utils/createUrl";
import { IUser } from "../../shared/types";
import { parseLinkHeader } from "../../shared/utils/parseLinkHeader";
import { useIsLarge } from "../../shared/hooks/useMediaQuery";
import UsersTable from "../../domain/users/UsersTable";
import UserGrid from "../../domain/users/UsersGrid";

const PAGE_LIMIT = 10;

const useFetchInfiniteUsers = () => {
  const axios = useAxios();

  return useInfiniteQuery(
    "users",
    async ({ pageParam = 1 }) => {
      const url = createUrl({ page: pageParam, pageLimit: PAGE_LIMIT });
      const user = await axios.get<IUser[]>(url);
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
  const isLarge = useIsLarge();

  return (
    <div className="section">
      <Header>Infinite Query</Header>
      <Link
        to={{
          pathname: "/user/create",
          state: { background: { ...location, path: "create-user" } },
        }}
      >
        <button className="btn mb-8">Create User</button>
      </Link>
      {isLarge ? (
        <UsersTable users={users?.data?.pages} location={location} />
      ) : (
        <UserGrid users={users?.data?.pages} location={location} />
      )}
      {/* <Table>
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
      </Table> */}

      <button
        className="btn my-8"
        onClick={() => users.fetchNextPage()}
        disabled={!users.hasNextPage || users.isFetchingNextPage}
      >
        Load More...
      </button>
    </div>
  );
};

export default InfiniteQuery;
