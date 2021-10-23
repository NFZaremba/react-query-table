import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Table } from "../../shared/components";
import toast from "react-hot-toast";
import useTable from "../../shared/hooks/useTable";
import { isFirstPage, isLastPage } from "../../shared/components/Table/helpers";
import { IData, IQuery } from "../../shared/types";
import { createUrl } from "../../shared/utils/createUrl";
import { useAxios } from "../../shared/contexts/AxiosProvider";
import { useRouter } from "../../shared/hooks/useRouter";

const PAGE_LIMIT = 10;

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
      const user = await axios.get<IData[]>(url);
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
  const {
    search: { searchTerm, setSearchTerm, debouncedSearchTerm },
    paginate: { next, prev, reset, currentPage },
    sort: { sortBy, orderBy, onSort },
  } = useTable();
  const users = useFetchPaginatedUsers({
    searchTerm: debouncedSearchTerm,
    page: currentPage,
    pageLimit: PAGE_LIMIT,
    sort: sortBy,
    order: orderBy,
  });

  useEffect(() => {
    // reset page to 1 when searching
    reset();
  }, [debouncedSearchTerm, reset]);

  return (
    <div className="w-full">
      <h1 className="bold text-4xl mb-8">Paginated Query Example</h1>
      <div>
        <Link
          to={{
            pathname: "/user/create",
            state: { background: { ...location, path: "create-user" } },
          }}
        >
          <button className="btn mb-8">Create User</button>
        </Link>
        <Table.Search
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header className="w-1/12" onClick={() => onSort("id")}>
                Id
              </Table.Header>
              <Table.Header onClick={() => onSort("first_name")}>
                First Name
              </Table.Header>
              <Table.Header onClick={() => onSort("last_name")}>
                Last Name
              </Table.Header>
              <Table.Header className="w-3/12" onClick={() => onSort("email")}>
                Email
              </Table.Header>
              <Table.Header onClick={() => onSort("gender")}>
                Gender
              </Table.Header>
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
        </Table>
        <Table.PaginateControls
          prevPage={prev}
          nextPage={next}
          currentPage={currentPage}
          isFirstPage={isFirstPage(currentPage)}
          isLastPage={isLastPage(users?.data?.length, PAGE_LIMIT)}
          isLoading={users?.isLoading || users?.isFetching}
        />
      </div>
    </div>
  );
};

export default PaginatedQuery;
