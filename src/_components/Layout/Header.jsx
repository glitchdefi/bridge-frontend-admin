import React from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <nav id="PPNavbar" className="navbar navbar-expand-md navbar-light bg-white">
        <div className="container">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <Link className="navbar-brand d-flex align-items-center" to='/'>
              <img src="/images/logo.png" height="27" alt="BSCPad" className="me-2" /> <span className="pp-site-name">BSCPad&nbsp;-&nbsp;</span>Admin CP
            </Link>
            <a id="WalletAction" className="btn btn-primary btn-sm" href="#" data-bs-toggle="modal" data-bs-target="#formModal">
              <i className="mdi mdi-plus me-1"></i><span>Add New Wallet</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
