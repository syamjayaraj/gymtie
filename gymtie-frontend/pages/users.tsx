import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function users() {
    return (
        <>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">


                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Navbar />
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">

                            {/* <!-- Page Heading --> */}
                            <h1 className="h3 mb-2 text-gray-800">Users</h1>

                            {/* <!-- DataTales Example --> */}
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Email Address</th>
                                                    <th>Age</th>
                                                    <th>Address</th>
                                                    <th>Start date</th>
                                                    <th>Payment Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Syamlal CM</td>
                                                    <td>9946792650</td>
                                                    <td>syamjayaraj@gmail.com</td>
                                                    <td>28</td>
                                                    <td width="19%">Chekkattarameethal-ho, Thalakkulathur-po, Kozhikode, 673317</td>
                                                    <td>25/12/2022</td>
                                                    <th>
                                                        <span className="badge badge-danger">Not paid</span>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer />
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}
            </div>
        </>
    )
}