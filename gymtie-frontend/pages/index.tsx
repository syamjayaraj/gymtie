import { useContext, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import Link from "next/link";


export default function Dashboard() {
    const router = useRouter()

    if (typeof window !== 'undefined') {
        const userToken = localStorage.getItem('userToken');
        useEffect(() => {
            if (userToken) {
            }
            else {
                router?.push("/login")
            }
        }, [userToken]);
    }


    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar />

                {/*<-- Content Wrapper -->*/}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/*<-- Main Content -->*/}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Navbar />
                        {/*<-- End of Topbar -->*/}

                        {/*<-- Begin Page Content -->*/}
                        <div className="container-fluid">

                            {/*<-- Page Heading -->*/}
                            {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                <Link href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</Link>
                            </div> */}

                            {/*<-- Content Row -->*/}
                            <div className="row">

                                {/*<-- Earnings (Monthly) Card Example -->*/}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Earnings (Monthly)</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<-- Earnings (Monthly) Card Example -->*/}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Earnings (Annual)</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<-- Earnings (Monthly) Card Example -->*/}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                                    </div>
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col-auto">
                                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="progress progress-sm mr-2">
                                                                <div className="progress-bar bg-info" role="progressbar"
                                                                    style={{
                                                                        width: "50%"
                                                                    }}
                                                                    aria-valuenow={50} aria-valuemin={0}
                                                                    aria-valuemax={100}></div>
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
                                </div>

                                {/*<-- Pending Requests Card Example -->*/}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Pending Requests</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*<-- Content Row -->*/}

                            <div className="row">

                                {/*<-- Area Chart -->*/}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4">
                                        {/*<-- Card Header - Dropdown -->*/}
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                            <div className="dropdown no-arrow">
                                                <Link className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </Link>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <Link className="dropdown-item" href="#">Action</Link>
                                                    <Link className="dropdown-item" href="#">Another action</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link className="dropdown-item" href="#">Something else here</Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<-- Card Body -->*/}
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <canvas id="myAreaChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<-- Pie Chart -->*/}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="card shadow mb-4">
                                        {/*<-- Card Header - Dropdown -->*/}
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                                            <div className="dropdown no-arrow">
                                                <Link className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </Link>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <Link className="dropdown-item" href="#">Action</Link>
                                                    <Link className="dropdown-item" href="#">Another action</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link className="dropdown-item" href="#">Something else here</Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<-- Card Body -->*/}
                                        <div className="card-body">
                                            <div className="chart-pie pt-4 pb-2">
                                                <canvas id="myPieChart"></canvas>
                                            </div>
                                            <div className="mt-4 text-center small">
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-primary"></i> Direct
                                                </span>
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-success"></i> Social
                                                </span>
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-info"></i> Referral
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<-- /.container-fluid -->*/}

                    </div>
                    {/*<-- End of Main Content -->*/}

                    {/*<-- Footer -->*/}
                    <Footer />
                    {/*<-- End of Footer -->*/}

                </div>
                {/*<-- End of Content Wrapper -->*/}

            </div>
            {/*<-- End of Page Wrapper -->*/}

            {/*<-- Scroll to Top Button-->*/}
            <Link className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </Link>

            {/*<-- Logout Modal-->*/}
            <div className="modal fade" id="logoutModal"
                // tabindex="-1" 
                role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select Logout below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link className="btn btn-primary" href="login.html">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
