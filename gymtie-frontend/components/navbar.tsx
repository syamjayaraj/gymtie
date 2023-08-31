import { useContext, useState } from "react";
import AppContext from "../AppContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter()
    const value = useContext(AppContext);
    let { userData } = value?.state;

    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        localStorage?.removeItem("userData")
        localStorage?.removeItem("userToken")
        router?.push("/login")
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>



                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                    <div className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userData?.name}</span>
                        <img className="img-profile rounded-circle"
                            src="/assets/images/user.png" />
                    </div>
                    {/* <!-- Dropdown - User Information --> */}
                    <div
                        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        style={{
                            display: showMenu ? "block" : "none"
                        }}
                        aria-labelledby="userDropdown">
                        {/* <Link className="dropdown-item" href="/profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </Link>
                        <div className="dropdown-divider"></div> */}
                        <div className="dropdown-item cursor-pointer" data-toggle="modal" data-target="#logoutModal"
                            onClick={logout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </div>
                    </div>
                </li>

            </ul>

        </nav>
    )
}