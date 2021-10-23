import { Link, NavLink } from "react-router-dom";
import ReactQueryIcon from "../../../icons/ReactQueryIcon";
import { IComponentBase } from "../../types";

// const StyledNavLink = styled(NavLink)`
//   display: block;
//   font-weight: 600;
//   font-size: 1.125rem;
//   line-height: 1.75rem;
//   margin-right: 1rem;
//   padding-bottom: 0.5rem;
//   text-align: center;
//   text-decoration: none;
//   width: 6rem;

//   &.active {
//     border-color: var(--chakra-colors-teal-500);
//     border-bottom-width: 2px;
//     font-weight: 700;
//     color: var(--chakra-colors-teal-800);
//   }
// `;

export interface ILink extends IComponentBase {
  to: string;
  exact?: boolean;
}

const LinkItem = ({ children, to, exact = false }: ILink) => {
  <NavLink className="" to={to} exact={exact}>
    {children}
  </NavLink>;
};

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between max-w-screen-lg mx-auto mb-10">
      <Link className="flex justify-center items-center" to="/">
        <ReactQueryIcon className="logo" />
        <h2 className="ml-4">Custom React Query</h2>
      </Link>
      <div className="flex">
        <NavLink to="/" exact>
          Basic
        </NavLink>
        <NavLink to="/paginated">Paginated</NavLink>
        <NavLink to="/infinite">Infinite</NavLink>
        <NavLink to="/local">Local</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
