import { useContext, useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import Link from "next/link";
import { getDashboardDetails } from "../services/dashboardApi";
import Loader from "../components/loader";

export default function Dashboard() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  let userToken = undefined;
  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("userToken");
  }

  useEffect(() => {
    if (userToken) {
    } else {
      router?.push("/login");
    }
  }, [userToken]);

  useEffect(() => {
    const handleGetDashboard = async () => {
      setLoading(true);
      const res: any = await getDashboardDetails();
      console.log(res, "ress");
      if (res?.status === 200) {
        setDashboard(res?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    handleGetDashboard();
  }, []);

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <Sidebar /> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            {loading && <Loader />}
            {!loading && (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <Link href="/payments">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Earnings (Monthly)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                ₹{dashboard?.earningsMonthly}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <Link href="/payments">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Earnings (Annual)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                ₹{dashboard?.earningsAnnual}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <Link href="/settings/members">
                      <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Members
                              </div>
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                    {dashboard?.numberOfMembers}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              Pending Fees
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              0
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Earnings Overview
                        </h6>
                        <div className="dropdown no-arrow">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <div className="dropdown-header">
                              Dropdown Header:
                            </div>
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="chart-area">
                          <canvas id="myAreaChart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Revenue Sources
                        </h6>
                        <div className="dropdown no-arrow">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <div className="dropdown-header">
                              Dropdown Header:
                            </div>
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                          <canvas id="myPieChart"></canvas>
                        </div>
                        <div className="mt-4 text-center small">
                          <span className="mr-2">
                            <i className="fas fa-circle text-primary"></i>{" "}
                            Direct
                          </span>
                          <span className="mr-2">
                            <i className="fas fa-circle text-success"></i>{" "}
                            Social
                          </span>
                          <span className="mr-2">
                            <i className="fas fa-circle text-info"></i> Referral
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* 
              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Earnings Overview
                      </h6>
                      <div className="dropdown no-arrow">
                        <Link
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </Link>
                        <div
                          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <div className="dropdown-header">
                            Dropdown Header:
                          </div>
                          <Link className="dropdown-item" href="#">
                            Action
                          </Link>
                          <Link className="dropdown-item" href="#">
                            Another action
                          </Link>
                          <div className="dropdown-divider"></div>
                          <Link className="dropdown-item" href="#">
                            Something else here
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <canvas id="myAreaChart"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
      <Link className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </Link>

      <div
        className="modal fade"
        id="logoutModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select Logout below if you are ready to end your current session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <Link className="btn btn-primary" href="login.html">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
