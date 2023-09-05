export default function Footer() {
    return (
        <section className="bg-light py-5" id="contact">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                    <h2 className="fw-bolder">Get in touch</h2>
                    <p className="lead mb-0">We'd love to hear from you</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        <div className="card mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div className="ms-4">
                                        <p className="mb-1">Call</p>
                                        <div className="small text-muted">
                                            <a href="tel:+919946792650">9946792650</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}