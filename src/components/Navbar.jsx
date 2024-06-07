import React, { useState } from "react";
import navstyle from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LogoutIcon from "@mui/icons-material/Logout";
const Navbar = () => {
  const [imgSource, setImgSource] = useState("assets/images/eng.svg");
  const [language, setLanguage] = useState("English");

  const { t, i18n } = useTranslation();

  const handelChangeArabic = () => {
    setImgSource("assets/images/eg.svg");
    setLanguage("Arabic");
    i18n.changeLanguage("ar");
  };
  const handelChangeEnglish = () => {
    setImgSource("assets/images/eng.svg");
    setLanguage("English");
    i18n.changeLanguage("en");
  };
  return (
    <div className={navstyle["navbar-custom"]}>
      <nav className={`navbar navbar-expand-lg navbar-dark mb-3`}>
        <div className={`container-fluid ${navstyle["container-main"]}`}>
          <Link className="navbar-brand" to="/">
            <img
              className={navstyle["logo"]}
              src="assets/images/logo-dark.png"
              alt="logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            style={{ color: "#009ddb" }}
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
                >
                  {t("Home")}
                </a>
              </li>
              <li className="nav-item dropdown ps-3">
                <a
                  className={`nav-link active ${navstyle["item-hover"]} text-uppercase fw-bold dropdown-toggle`}
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("Movies")}
                </a>
                <ul
                  className={`${navstyle["dropdown-menu"]} dropdown-menu ms-3`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                    >
                      {t("What's On")}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                    >
                      {t("Coming Soon")}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* <ul className="navbar-nav ms-auto">
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
                </ul> */}

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
                  {t("My Account")}
                </a>
                <ul
                  className={`${navstyle["dropdown-menu"]} dropdown-menu`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item`}
                      id={navstyle["click"]}
                    >
                      {t("Profile")}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item`}
                      id={navstyle["click"]}
                    >
                      {t("Last Reservations")}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item`}
                      id={navstyle["click"]}
                    >
                      {t("Movies Favorites")}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item`}
                      id={navstyle["click"]}
                    >
                      <LogoutIcon></LogoutIcon> {t("Logout")}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className={`ps-3 nav-link dropdown-toggle ${navstyle["item-hover"]} text-uppercase fw-bold active`}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t(language)}{" "}
                  <img
                    src={imgSource}
                    style={{ width: "30px", height: "30px", marginLeft: "5px" }}
                  />
                </a>
                <ul
                  className={`${navstyle["dropdown-menu"]} dropdown-menu ms-3`}
                  aria-labelledby="Dropdown"
                >
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                      onClick={handelChangeEnglish}
                    >
                      <img
                        src="assets/images/eng.svg"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      {t("English")}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                      onClick={handelChangeArabic}
                    >
                      <img
                        src="assets/images/eg.svg"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      {t("Arabic")}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
