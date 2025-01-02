import React from "react";
import "./side-bar.css";
import { NavLink } from "react-router-dom";
import { sideAdmin, sideCom } from "../../../../utils/static/sideBarLine";
import { useUser } from "../../../../hooks/useUser";
function SideBar({ open, setOpen }) {
  const { user } = useUser();
  return (
    <div className="z-10">
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon" />
          <div className="logo_name">LOGO</div>
          <i
            className={`bx ${!open ? "bx-menu" : "bx-menu-alt-right"}`}
            id="btn"
            onClick={() => setOpen()}
          />
        </div>
        <ul className="nav-list">
          {user.role == "ROLE_ADMIN" &&
            sideAdmin.map((line, key) => (
              <li key={key}>
                <NavLink to={line.link}>
                  <i className={line.icon}></i>{" "}
                  <span className="links_name">{line.label}</span>
                </NavLink>
                <span className="tooltip">{line.label}</span>
              </li>
            ))}
          {user.role == "equipeCom" &&
            sideCom.map((line, key) => (
              <li key={key}>
                <NavLink to={line.link}>
                  <i className={line.icon}></i>{" "}
                  <span className="links_name">{line.label}</span>
                </NavLink>
                <span className="tooltip">{line.label}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
