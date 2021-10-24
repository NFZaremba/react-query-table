import { Link, LinkProps } from "react-router-dom";
import EditIcon from "../../../icons/EditIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import { IComponentBase } from "../../types";
import { noop } from "../../utils/noop";

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
};
export type ISelectLimit = {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    label: string;
  }[];
};

const Table = ({ children, className = "", ...restProps }: ITable) => {
  return (
    <table
      className={`min-w-full divide-y divide-gray-200 shadow-xl${className}`}
      {...restProps}
    >
      {children}
    </table>
  );
};

const Head = ({ children, className = "", ...restProps }: ITableHead) => {
  return (
    <thead className={`bg-gray-50 ${className}`} {...restProps}>
      {children}
    </thead>
  );
};

const Row = ({ children, className = "", ...restProps }: ITableRow) => {
  return (
    <tr className={`even:bg-gray-50 ${className}`} {...restProps}>
      {children}
    </tr>
  );
};

const Header = ({
  children,
  className = "",
  onClick = noop,
  ...restProps
}: ITableHeader) => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </th>
  );
};

const Body = ({ children, className = "", ...restProps }: ITableBody) => {
  return (
    <tbody className={`${className}`} {...restProps}>
      {children}
    </tbody>
  );
};

const Cell = ({ children, className = "", ...restProps }: ITableCell) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}
      {...restProps}
    >
      {children}
    </td>
  );
};

const Edit = ({ to, ...restProps }: ITableEdit) => {
  return (
    <Link to={to}>
      <button className="btn-ghost" {...restProps}>
        <EditIcon />
      </button>
    </Link>
  );
};

const Delete = ({ to, ...restProps }: ITableDelete) => {
  return (
    <>
      <Link to={to}>
        <button className="btn-ghost" {...restProps}>
          <DeleteIcon />
        </button>
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
    <div className="flex justify-between items-center mt-8" {...restProps}>
      <button
        className="btn"
        onClick={prevPage}
        disabled={isFirstPage || isLoading}
      >
        Prev
      </button>
      <span>Page: {currentPage}</span>
      <button
        className="btn"
        onClick={nextPage}
        disabled={isLastPage || isLoading}
      >
        Next
      </button>
    </div>
  );
};

const Search = ({ value = "", onChange }: ITableSearch) => {
  return (
    <input
      className={
        "block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-4"
      }
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
    />
  );
};

const SelectLimit = ({ value, onChange, label, id, options }: ISelectLimit) => {
  return (
    <div className="flex items-center mt-8">
      <label htmlFor={id}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="block ml-4 w-1/4 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Table.Head = Head;
Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Cell = Cell;
Table.ActionEdit = Edit;
Table.ActionDelete = Delete;
Table.PaginateControls = PaginateControls;
Table.Search = Search;
Table.SelectLimit = SelectLimit;

export default Table;
