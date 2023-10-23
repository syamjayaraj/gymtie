import { useContext, useState } from "react";
import AppContext from "../AppContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const path = router?.asPath;
  const value = useContext(AppContext);
  let { userData } = value?.state;

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage?.removeItem("userData");
    localStorage?.removeItem("userToken");
    router?.push("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav">
        <li className="nav-item no-arrow">
          <div className="row nav-left-container">
            <div className="logo-container">
              <Link className="nav-link" href="/">
                <img src="/assets/images/logo.png" className="logo" />
              </Link>
            </div>
            <div className="name-container">
              <div className="gym-name">New Wings Health Club</div>
              <div className="powered-by">
                Powered by{" "}
                <a href="https://gymtie.com" target="_blank">
                  GymTie
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item no-arrow">
          <Link href="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item no-arrow">
          <Link
            href="/payments"
            className={`nav-link ${path === "/payments" ? "active" : ""}`}
          >
            Payments
          </Link>
        </li>
        <li className="nav-item no-arrow">
          <Link
            href="/pay-fee"
            className={`nav-link ${path === "/pay-fee" ? "active" : ""}`}
          >
            <button type="button" className="btn btn-outline-dark">
              Pay Fee
            </button>
          </Link>
        </li>

        <li className="nav-item dropdown no-arrow">
          <div
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userData?.name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="/assets/images/user.png"
            />
          </div>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            style={{
              display: showMenu ? "block" : "none",
            }}
            aria-labelledby="userDropdown"
          >
            {/* <Link className="dropdown-item" href="/profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </Link>
            <div className="dropdown-divider"></div> */}
            <Link className="dropdown-item" href="/settings">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </Link>
            <div className="dropdown-divider"></div>
            <div
              className="dropdown-item cursor-pointer"
              data-toggle="modal"
              data-target="#logoutModal"
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
