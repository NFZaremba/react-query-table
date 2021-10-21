import { Link, LinkProps } from "react-router-dom";

import EditIcon from "../../../icons/EditIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { IComponentBase } from "../../types";

export type ITable = IComponentBase;
export type ITableHead = IComponentBase;
export type ITableRow = IComponentBase;
export type ITableHeader = {
  onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
} & IComponentBase;
export type ITableBody = IComponentBase;
export type ITableCell = IComponentBase;
export type ITableFooter = IComponentBase;
export type ITableActionCell = IComponentBase;
export type ITableEdit = { to: LinkProps["to"] };
export type ITableDelete = { to: LinkProps["to"] };
export type ITablePaginate = {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  isLoading?: boolean;
};
export type ITableSearch = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps;

const Table = ({ children, ...restProps }: ITable) => {
  return (
    <ChakraTable boxShadow="2xl" {...restProps}>
      {children}
    </ChakraTable>
  );
};

const Head = ({ children, ...restProps }: ITableHead) => {
  return <Thead {...restProps}>{children}</Thead>;
};

const Row = ({ children, ...restProps }: ITableRow) => {
  return <Tr {...restProps}>{children}</Tr>;
};

const Header = ({
  children,
  onClick = () => {},
  ...restProps
}: ITableHeader) => {
  return (
    <Th onClick={onClick} {...restProps}>
      {children}
    </Th>
  );
};

const Body = ({ children, ...restProps }: ITableBody) => {
  return <Tbody {...restProps}>{children}</Tbody>;
};

const Cell = ({ children, ...restProps }: ITableCell) => {
  return <Td {...restProps}>{children}</Td>;
};

const Footer = ({ children, ...restProps }: ITableFooter) => {
  return <Tfoot {...restProps}>{children}</Tfoot>;
};

const ActionCell = ({ children, ...restProps }: ITableActionCell) => {
  return (
    <Td display="flex" justifyContent="space-between" {...restProps}>
      {children}
    </Td>
  );
};

const Edit = ({ to, ...restProps }: ITableEdit) => {
  return (
    <Link to={to}>
      <Button variant="ghost" {...restProps}>
        <EditIcon />
      </Button>
    </Link>
  );
};

const Delete = ({ to, ...restProps }: ITableDelete) => {
  return (
    <>
      <Link to={to}>
        <Button variant="ghost" {...restProps}>
          <DeleteIcon />
        </Button>
      </Link>
    </>
  );
};

const PaginateControls = ({
  prevPage,
  nextPage,
  currentPage,
  isLastPage,
  isFirstPage,
  isLoading,
  ...restProps
}: ITablePaginate) => {
  return (
    <Flex justify="space-between" align="center" mt={6} {...restProps}>
      <Button
        colorScheme="teal"
        onClick={prevPage}
        disabled={isFirstPage || isLoading}
      >
        Prev
      </Button>
      <span>Page: {currentPage}</span>
      <Button
        colorScheme="teal"
        onClick={nextPage}
        disabled={isLastPage || isLoading}
      >
        Next
      </Button>
    </Flex>
  );
};

const Search = ({ value = "", onChange, ...restProps }: ITableSearch) => {
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
Table.PaginateControls = PaginateControls;
Table.Search = Search;

export default Table;
