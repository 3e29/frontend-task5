import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Sidebar.css";
import { Button, Navbar } from "react-bootstrap";
import productLogo from "../assets/img/products.svg";
import savedLogo from "../assets/img/bookmark.svg";
import logtOutLogo from "../assets/img/sign-out-logo.svg";

type SidebarProps = {
  logo: string;
};

const Sidebar: React.FC<SidebarProps> = ({ logo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [personalPic, setPersonalPic] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPersonalPic = localStorage.getItem("personalPic");
    setUsername(storedUsername);
    setPersonalPic(storedPersonalPic);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .post(
        "https://test1.focal-x.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        localStorage.removeItem("token");
        navigate("/signin");
      })
      .catch((error) => console.log(error));
  };

  const isActiveProducts =
    location.pathname === "/" ||
    location.pathname.startsWith("/add") ||
    location.pathname.startsWith("/show") ||
    location.pathname.startsWith("/edit");

  return (
    <section id="side-bar">
      {/* Sidebar Toggle Button */}
      <button
        className={`sidebar-toggle ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div className={`sidebar d-flex flex-column align-items-center ${isSidebarOpen ? "show" : ""}`}>
        <Navbar.Brand className="logo-line">
          <Link to="/">
            <img src={logo} className="Nav-logo" alt="React Bootstrap logo" />
          </Link>
        </Navbar.Brand>

        <div className="profile-section d-flex flex-column align-items-center">
          {personalPic && (
            <img src={personalPic} alt="User" className="profile-pic" />
          )}
          {username && <p className="username">{username}</p>}
        </div>

        <Navbar className="nav-links d-flex align-items-center flex-column">
          <NavLink
            to="/"
            className={`nav-link text-center ${isActiveProducts ? "active" : ""}`}
          >
            <img src={productLogo} alt="" className="pe-2" /> Products
          </NavLink>
          <NavLink
            to="/favorites"
            className={`nav-link text-center ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
          >
            <img src={savedLogo} alt="" /> Favorites
          </NavLink>
          <NavLink
            to="/order-list"
            className={`nav-link text-center ${
              location.pathname === "/order-list" ? "active" : ""
            }`}
          >
            <img src={savedLogo} alt="" /> Order list
          </NavLink>
        </Navbar>

        <div className="logout-section mt-auto">
          <Button
            className="logout-btn text-black p-0"
            variant="link"
            onClick={handleLogout}
          >
            Logout <img src={logtOutLogo} alt="" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
