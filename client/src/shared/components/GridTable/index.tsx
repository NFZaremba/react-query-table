import { Link, LinkProps } from "react-router-dom";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import { IComponentBase } from "../../types";

type GridTableProps = {
  children: React.ReactElement[];
};
type GridTableHeaderProps = IComponentBase;
type GridTableTextProps = IComponentBase;
export type GridTableEdit = { to: LinkProps["to"] };
export type GridTableDelete = { to: LinkProps["to"] };

const GridTable = ({ children }: GridTableProps) => {
  return (
    <div className="min-w-full grid grid-cols-users gap-4 overflow-y-scroll overflow-x-scroll max-h-[calc(100vh-20rem)]">
      {children}
    </div>
  );
};

const Header = ({ children }: GridTableHeaderProps) => {
  return <h2>{children}</h2>;
};

const Text = ({ children }: GridTableTextProps) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};

const Edit = ({ to, ...restProps }: GridTableEdit) => {
  return (
    <Link to={to}>
      <button className="btn-ghost" {...restProps}>
        <EditIcon />
      </button>
    </Link>
  );
};

const Delete = ({ to, ...restProps }: GridTableDelete) => {
  return (
    <Link to={to}>
      <button className="btn-ghost" {...restProps}>
        <DeleteIcon />
      </button>
    </Link>
  );
};

GridTable.Header = Header;
GridTable.Text = Text;
GridTable.Edit = Edit;
GridTable.Delete = Delete;

export default GridTable;
