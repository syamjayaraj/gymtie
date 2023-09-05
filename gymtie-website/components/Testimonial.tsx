export default function Testimonial() {
    return (
        <section className="py-5 border-bottom" id="testimonial">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Customer testimonials</h2>
                    <p className="lead mb-0">Our customers love working with us</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">


                        <div className="card mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div className="ms-4">
                                        <p className="mb-1">Thank you for putting together such a great product. We loved working with you and the whole team, and we will be recommending you to others!</p>
                                        <div className="small text-muted">- Sajith, (Master's Gym)</div>
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