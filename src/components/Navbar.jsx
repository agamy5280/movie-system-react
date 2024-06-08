import React, { useEffect, useState } from "react";
import navstyle from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { clearFavorite, selectFavorites } from "../redux/store/Slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
const Navbar = () => {
  const [imgSource, setImgSource] = useState("assets/images/eng.svg");
  const [language, setLanguage] = useState("English");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
  const { t, i18n } = useTranslation();
  const favorites = useSelector(selectFavorites);
  const dispatch  = useDispatch();
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

  const login = () => {
    setUser(localStorage.getItem("userData"));
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    dispatch(clearFavorite());
  };
  const StyledFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
    "&:hover": {
      color: "#d40f7d",
    },
  }));
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
                <Link
                  className={`nav-link active fw-bold text-uppercase ${navstyle["item-hover"]}`}
                  aria-current="page"
                  to={"/"}
                >
                  {t("Home")}
                </Link>
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
                    <Link
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                      to={"/"}
                    >
                      {t("What's On")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${navstyle["dropdown-item"]} dropdown-item text-uppercase`}
                      to={"/coming-soon"}
                    >
                      {t("Coming Soon")}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {user === null ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    id={navstyle["login-btn"]}
                    className={`nav-link ${navstyle["item-hover"]} active fw-bold text-uppercase ps-3`}
                    to={"/login"}
                    onClick={login}
                  >
                    {t("Login")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${navstyle["item-hover"]} active fw-bold text-uppercase ps-3`}
                    id={navstyle["login-btn"]}
                    to={"/register"}
                  >
                    {t("Sign-up")}
                  </Link>
                </li>
              </ul>
            ) : (
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
                      <Link
                        className={`${navstyle["dropdown-item"]} dropdown-item`}
                        id={navstyle["click"]}
                        to={`/profile-edit?id=${user.id}`}
                      >
                        {t("Profile")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`${navstyle["dropdown-item"]} dropdown-item`}
                        id={navstyle["click"]}
                        to={"/"}
                      >
                        {t("Last Reservations")}
                      </Link>
                    </li>
                    <li>
                      <a
                        className={`${navstyle["dropdown-item"]} dropdown-item`}
                        id={navstyle["click"]}
                        onClick={logout}
                      >
                        <LogoutIcon></LogoutIcon> {t("Logout")}
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link style={{ color: "#FFF" }} to={"/favorites"}>
                    <Badge
                      badgeContent={favorites.length}
                      color="error"
                      sx={{ marginTop: "6px", cursor: "pointer" }}
                    >
                      <StyledFavoriteIcon />
                    </Badge>
                  </Link>
                </li>
              </ul>
            )}

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
