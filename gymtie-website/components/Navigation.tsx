import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <Link className="navbar-brand" href="/">GymTie</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" href="#features">Features</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#pricing">Pricing</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#testimonial">Testimonial</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#contact">Contact</Link></li>
                        <li className="nav-item"><a className="nav-link login" href="https://app.gymtie.com" target="_blank">
                            <div className="login">
                                Login
                            </div>
                        </a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}