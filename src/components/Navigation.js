import { NavLink, useNavigate } from "react-router-dom";

function Navigation() {
  let navigate = useNavigate();
  return (
    <nav>
      <div className="container nav-flex">
        <h2 className="logo">Interviews Reports</h2>
        <div className="nav-btn-wrap">
          <NavLink
            end
            className={({ isActive }) =>
              isActive ? "nav-btn active-nav-link" : "nav-btn"
            }
            to="/reportpage"
          >
            Candidates
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

export default Navigation;
