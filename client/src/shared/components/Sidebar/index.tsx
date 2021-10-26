import { ImPagebreak } from "react-icons/im";
import { FaTable, FaLaptopHouse } from "react-icons/fa";
import { CgInfinity } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const SideBarIcon = ({
  icon,
  text = "tooltip 💡",
}: {
  icon: JSX.Element;
  text?: string;
}) => (
  <div className="sidebar-icon group">
    {icon} <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Sidebar = () => {
  return (
    <div
      className="fixed bottom-0 lg:top-0 left-0 w-screen lg:h-screen lg:w-16 m-0 flex lg:flex-col 
    bg-gray-900 text-white shadow-lg justify-center"
    >
      <NavLink to="/">
        <SideBarIcon text="Basic" icon={<FaTable size="28" />} />
      </NavLink>
      <NavLink to="/paginated">
        <SideBarIcon text="Paginated" icon={<ImPagebreak size="32" />} />
      </NavLink>
      <NavLink to="/infinite">
        <SideBarIcon text="Infinite" icon={<CgInfinity size="20" />} />
      </NavLink>
      <NavLink to="/local">
        <SideBarIcon text="Local" icon={<FaLaptopHouse size="20" />} />
      </NavLink>
    </div>
  );
};

export default Sidebar;
