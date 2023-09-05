export default function Pricing() {
    return (
        <section className="bg-light py-5 border-bottom" id="pricing">
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Pricing</h2>
                    <p className="lead mb-0">Choose your plan</p>
                </div>
                <div className="row gx-5 justify-content-center">

                    <div className="col-lg-6 col-xl-4">
                        <div className="card mb-5 mb-xl-0">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold text-muted">Free</div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">₹0</span>
                                    <span className="text-muted">/ month</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>1 admin</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Add upto 500 members
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Access the app from your computer and mobile
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-6 col-xl-4">
                        <div className="card mb-5 mb-xl-0">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    Pro
                                </div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">₹199</span>
                                    <span className="text-muted">/ month</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>2 admins</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Add upto 2000 members
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Access the app from your computer and mobile
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Manage using Mobile App (Android)
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Customize app with your Gym logo
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-6 col-xl-4">
                        <div className="card">
                            <div className="card-body p-5">
                                <div className="small text-uppercase fw-bold text-muted">Enterprise</div>
                                <div className="mb-3">
                                    <span className="display-4 fw-bold">₹490</span>
                                    <span className="text-muted">/ mo.</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>5 admins</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        <strong>Unlimited members</strong>
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Access the app from your computer and mobile
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Manage using Mobile App (Android)
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Customize app with your Gym logo
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-check text-primary"></i>
                                        Dedicated website for the gym
                                    </li>
                                </ul>
                                <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}