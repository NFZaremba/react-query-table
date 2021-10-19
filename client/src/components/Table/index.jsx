import React from "react";
import { Link } from "react-router-dom";

import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";

// components
const Table = ({ children, ...restProps }) => {
  return (
    <ChakraTable boxShadow="2xl" {...restProps}>
      {children}
    </ChakraTable>
  );
};

const Head = ({ children, ...restProps }) => {
  return <Thead {...restProps}>{children}</Thead>;
};

const Row = ({ children, ...restProps }) => {
  return <Tr {...restProps}>{children}</Tr>;
};

const Header = ({ children, ...restProps }) => {
  return <Th {...restProps}>{children}</Th>;
};

const Body = ({ children, ...restProps }) => {
  return <Tbody {...restProps}>{children}</Tbody>;
};

const Cell = ({ children, ...restProps }) => {
  return <Td {...restProps}>{children}</Td>;
};

const Footer = ({ children, ...restProps }) => {
  return <Tfoot {...restProps}>{children}</Tfoot>;
};

const Caption = ({ children, ...restProps }) => {
  return <TableCaption {...restProps}>{children}</TableCaption>;
};

const ActionCell = ({ children, ...restProps }) => {
  return (
    <Td display="flex" justifyContent="space-between" {...restProps}>
      {children}
    </Td>
  );
};

const Edit = ({ to, icon, ...restProps }) => {
  return (
    <Link to={to}>
      <Button variant="ghost" {...restProps}>
        {icon ? icon : <EditIcon />}
      </Button>
    </Link>
  );
};

const Delete = ({
  to,
  onClick,
  icon,
  deleteId,
  onSuccess,
  isLoading,
  ...restProps
}) => {
  return (
    <>
      <Link to={to}>
        <Button variant="ghost" {...restProps}>
          {icon ? icon : <DeleteIcon />}
        </Button>
      </Link>
    </>
  );
};

const PaginateControls = ({
  prevPage,
  nextPage,
  currentPage,
  lastPage,
  firstPage,
  isLoading,
  ...restProps
}) => {
  return (
    <Flex justify="space-between" align="center" mt={6} {...restProps}>
      <Button
        colorScheme="teal"
        onClick={prevPage}
        disabled={firstPage || isLoading}
      >
        Prev
      </Button>
      <span>Page: {currentPage}</span>
      <Button
        colorScheme="teal"
        onClick={nextPage}
        disabled={lastPage || isLoading}
      >
        Next
      </Button>
    </Flex>
  );
};

const Search = ({ value = "", onChange, ...restProps }) => {
  return (
    <Input
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
};

Table.Head = Head;
Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Cell = Cell;
Table.Actions = ActionCell;
Table.ActionEdit = Edit;
Table.ActionDelete = Delete;
Table.Footer = Footer;
Table.Caption = Caption;
Table.PaginateControls = PaginateControls;
Table.Search = Search;

export default Table;
