import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const path = router?.asPath;

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          href="/"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">GymTie</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className={`nav-item ${path === "/" ? "active" : ""}`}>
          <Link href="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`nav-item ${path === "/pay-fee" ? "active" : ""}`}>
          <Link href="/pay-fee" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Pay Fee</span>
          </Link>
        </li>
        <li className={`nav-item ${path === "/payments" ? "active" : ""}`}>
          <Link href="/payments" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Payments</span>
          </Link>
        </li>
        <li className={`nav-item ${path === "/settings" ? "active" : ""}`}>
          <Link href="/settings" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
