import React from "react";
import { Link } from "react-router-dom";
import DesktopLogo from "../assets/images/logo.png";
import MobileLogo from "../assets/images/logo-mobile.png";

function Header() {
  return (
    <div class="menu_wrapper landing-page-main">
      <div class="container d-flex justify-content-between">
        <div class="logo-wrapper text-center">
          <Link to={"/"} className="navbar-brand">
            <img src={DesktopLogo} class="desktop-logo" alt="logo" />
          </Link>
          <Link to={"/"} className="navbar-brand mobile-navbar">
            <img src={DesktopLogo} class="mobile-logo" alt="logo" />
          </Link>
        </div>
        <div class="drop-down-wrpper">
          <div class="drop-down"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
