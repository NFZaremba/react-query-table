import { Header, Table } from "../../shared/components";
import useTable from "../../shared/hooks/useTable";

import data from "../../data";
import { isFirstPage, isLastPage } from "../../shared/components/Table/helpers";

const PAGE_LIMIT = 15;

const LocalQuery = () => {
  const {
    paginate: { next, prev, currentPage, currentData },
    sort: { onSort },
  } = useTable(data, { pageLimit: PAGE_LIMIT });

  return (
    <div className="section">
      <Header>Local Query</Header>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header className="w-1/12" onClick={() => onSort("id")}>
              Id
            </Table.Header>
            <Table.Header onClick={() => onSort("firstName")}>
              First Name
            </Table.Header>
            <Table.Header onClick={() => onSort("lastName")}>
              Last Name
            </Table.Header>
            <Table.Header className="w-3/12" onClick={() => onSort("email")}>
              Email
            </Table.Header>
            <Table.Header onClick={() => onSort("department")}>
              Department
            </Table.Header>
            <Table.Header onClick={() => onSort("jobTitle")}>
              Job Title
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[...currentData()]?.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.department}</Table.Cell>
              <Table.Cell>{user.jobTitle}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Table.PaginateControls
        prevPage={prev}
        nextPage={next}
        currentPage={currentPage}
        isFirstPage={isFirstPage(currentPage)}
        isLastPage={isLastPage(currentData().length, PAGE_LIMIT)}
      />
    </div>
  );
};

export default LocalQuery;
