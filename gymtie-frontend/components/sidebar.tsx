import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {

    const router = useRouter()
    console.log(router, "router")
    const path = router?.asPath

    return (
        <>
            {/*<-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<-- Sidebar - Brand -->*/}
                <Link href="/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">GymTie</div>
                </Link>

                {/*<-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<-- Nav Item - Dashboard -->*/}
                <li className={`nav-item ${path === "/dashboard" ? "active" : ""}`}>
                    <Link href="/dashboard" className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>



                {/*<-- Heading -->*/}
                {/* <div className="sidebar-heading">
                    Addons
                </div> */}


                {/*<-- Nav Item - Tables -->*/}
                <li className={`nav-item ${path === "/users" ? "active" : ""}`}>
                    <Link href="/users" className="nav-link">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Users</span>
                    </Link>
                </li>


                {/*<-- Sidebar Toggler (Sidebar) -->*/}
                {/* <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div> */}

            </ul>
            {/*<-- End of Sidebar -->*/}
        </>
    )
}