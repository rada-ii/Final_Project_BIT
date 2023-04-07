import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminNav() {
  let navigate = useNavigate();
  return (
    <nav className="admin-nav">
      <div className="container nav-flex">
        <h2 onClick={() => navigate("/admin/reports")}>
          Reports Administration
        </h2>
        <div className="admin-buttons">
          <NavLink
            end
            className={({ isActive }) =>
              isActive ? "admin-btn active-nav-link" : "admin-btn"
            }
            to={"/admin/reports"}
          >
            Reports
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "admin-btn active-nav-link" : "admin-btn"
            }
            to={"/admin/reports/createreport"}
          >
            Create Report
          </NavLink>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn-logout"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
