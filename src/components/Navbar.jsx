import React from 'react';
import navstyle from "../styles/Navbar.module.css";
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className={navstyle["navbar-custom"]}>
            <nav className={`navbar navbar-expand-lg navbar-dark mb-3`}>
            <div className={`container-fluid ${navstyle["container-main"]}`}>
                <Link className="navbar-brand" to="/">
                    <img className={navstyle["logo"]} src="assets/images/logo-dark.png" alt='logo'/>
                </Link>

                <button
                className="navbar-toggler"
                type="button"
                style={{color:"#009ddb"}}
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ps-3">
                    <a
                        className={`nav-link active fw-bold text-uppercase ${navstyle["item-hover"]}`}
                        aria-current="page"
                        >Home</a>
                    </li>
                    <li className="nav-item dropdown ps-3">
                    <a
                        className={`nav-link active ${navstyle["item-hover"]} text-uppercase fw-bold dropdown-toggle`}
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Movies
                    </a>
                    <ul className={`${navstyle["dropdown-menu"]} dropdown-menu ms-3`} aria-labelledby="navbarDropdown">
                        <li>
                        <a className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                            >What's On</a
                        >
                        </li>
                        <li>
                        <a className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                            >Coming Soon</a
                        >
                        </li>
                    </ul>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                    <a
                        id={navstyle["login-btn"]}
                        className={`nav-link ${navstyle["item-hover"]} active fw-bold text-uppercase ps-3`}>Login</a>
                    </li>
                    <li className="nav-item">
                    <a
                        className={`nav-link ${navstyle["item-hover"]} active fw-bold text-uppercase ps-3`}
                        id={navstyle["login-btn"]}
                        >Sign-up</a
                    >
                    </li>
                </ul>
                
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                    <a
                        className={`ps-3 nav-link dropdown-toggle ${navstyle["item-hover"]} text-uppercase fw-bold active`}
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        My Account
                    </a>
                    <ul className={`${navstyle["dropdown-menu"]} dropdown-menu`} aria-labelledby="navbarDropdown">
                        <li>
                        <a className={`${navstyle["dropdown-item"]} dropdown-item`}
                         id={navstyle["click"]}>Profile</a
                        >
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                        <a className={`${navstyle["dropdown-item"]} dropdown-item`}
                         id={navstyle["click"]}
                            >Last Reservations</a
                        >
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                        <a className={`${navstyle["dropdown-item"]} dropdown-item`} id={navstyle["click"]}>Logout</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
            
        </div>
    );
}

export default Navbar;
