import React from "react";

import { Table } from "../../components";
import { Heading } from "@chakra-ui/react";
import useTable from "../../hooks/useTable";
import { getFirstPage, getLastPage } from "../../utils/table.helpers";
import data from "../../data";

const PAGE_LIMIT = 15;

const LocalQuery = () => {
  const {
    paginate: { next, prev, currentPage, currentData },
    sort: { onSort },
  } = useTable(data, PAGE_LIMIT);

  return (
    <>
      <Heading mb={4}>Local Query Example</Heading>
      <div>
        <Table size="md">
          <Table.Head>
            <Table.Row>
              <Table.Header onClick={() => onSort("id")}>Id</Table.Header>
              <Table.Header onClick={() => onSort("firstName")}>
                First Name
              </Table.Header>
              <Table.Header onClick={() => onSort("lastName")}>
                Last Name
              </Table.Header>
              <Table.Header onClick={() => onSort("email")}>Email</Table.Header>
              <Table.Header onClick={() => onSort("department")}>
                Department
              </Table.Header>
              <Table.Header onClick={() => onSort("jobTitle")}>
                Job Title
              </Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {[...currentData()]?.map((user) => (
              <Table.Row key={user.id}>
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
          firstPage={getFirstPage(currentPage)}
          lastPage={getLastPage(currentData().length, PAGE_LIMIT)}
        />
      </div>
    </>
  );
};

export default LocalQuery;
