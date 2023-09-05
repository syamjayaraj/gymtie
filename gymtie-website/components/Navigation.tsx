import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <Link className="navbar-brand" href="/">GymTie</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={() => setShowMenu(!showMenu)}><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{
                    display: showMenu ? "block" : "none"
                }}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" href="#features">Features</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#pricing">Pricing</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#testimonial">Testimonial</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#contact">Contact</Link></li>
                        <li className="nav-item"><a className="nav-link login" href="https://app.gymtie.com" target="_blank">
                            <div className="login text-secondary">
                                Login
                            </div>
                        </a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}