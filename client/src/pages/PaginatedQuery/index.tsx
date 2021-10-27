import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Header, Table } from "../../shared/components";
import toast from "react-hot-toast";
import useTable from "../../shared/hooks/useTable";
import { isFirstPage, isLastPage } from "../../shared/components/Table/helpers";
import { IQuery, IUser } from "../../shared/types";
import { createUrl } from "../../shared/utils/createUrl";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";
import { useIsLarge } from "../../shared/hooks/useMediaQuery";
import UsersTable from "../../domain/users/UsersTable";
import UserGrid from "../../domain/users/UsersGrid";

const useFetchPaginatedUsers = ({
  searchTerm,
  page,
  pageLimit,
  sort,
  order,
}: IQuery) => {
  const axios = useAxios();

  return useQuery(
    ["users", { searchTerm, page, pageLimit, sort, order }],
    async () => {
      const url = createUrl({ searchTerm, page, pageLimit, sort, order });
      const user = await axios.get<IUser[]>(url);
      return { data: user.data };
    },
    {
      onError: (error) => {
        if (error instanceof Error)
          toast.error(`Error occured. ${error.message}`);
      },
      select: ({ data }) => {
        return data;
      },
      keepPreviousData: true,
    }
  );
};

const PaginatedQuery = () => {
  const { location } = useRouter();
  const [limit, setLimit] = useState<number>(15);
  const {
    search: { searchTerm, setSearchTerm, debouncedSearchTerm },
    paginate: { next, prev, reset, currentPage },
    sort: {
      sortBy,
      orderBy,
      //onSort
    },
  } = useTable();
  const users = useFetchPaginatedUsers({
    searchTerm: debouncedSearchTerm,
    page: currentPage,
    pageLimit: Number(limit),
    sort: sortBy,
    order: orderBy,
  });
  const isLarge = useIsLarge();

  useEffect(() => {
    // reset page to 1 when searching
    reset();
  }, [debouncedSearchTerm, reset, limit]);

  return (
    <div className="section">
      <Header>Paginated Query</Header>
      <div className="flex justify-between align-items mb-8 flex-col lg:flex-row">
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
          id="limit"
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
      <Table.Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {isLarge ? (
        <UsersTable users={users?.data} location={location} />
      ) : (
        <UserGrid users={users?.data} location={location} />
      )}
      {/* <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header className="w-1/12" onClick={() => onSort("id")}>
              Id
            </Table.Header>
            <Table.Header
              className=" cursor-pointer"
              onClick={() => onSort("first_name")}
            >
              First Name
            </Table.Header>
            <Table.Header onClick={() => onSort("last_name")}>
              Last Name
            </Table.Header>
            <Table.Header className="w-3/12" onClick={() => onSort("email")}>
              Email
            </Table.Header>
            <Table.Header onClick={() => onSort("gender")}>Gender</Table.Header>
            <Table.Header>
              {" "}
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
      <Table.PaginateControls
        prevPage={prev}
        nextPage={next}
        currentPage={currentPage}
        isFirstPage={isFirstPage(currentPage)}
        isLastPage={isLastPage(users?.data?.length, Number(limit))}
        isLoading={users?.isLoading || users?.isFetching}
      />
    </div>
  );
};

export default PaginatedQuery;
