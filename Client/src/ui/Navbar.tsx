import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        users
      </NavLink>
      <NavLink to="/studios">studios</NavLink>
      <NavLink to="/animes">animes</NavLink>
    </nav>
  );
};

export default NavBar;
