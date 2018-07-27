import React from "react";
// import { Button } from "reactstrap";
// import { Navlink } from "react-router";
// import IntlMessages from "util/IntlMessages";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="d-flex flex-row justify-content-between">
        <div>
          <button size="sm" className="btn btn-link">
            About
          </button>
          <button size="sm" className="btn btn-link">
            Contact
          </button>
        </div>
        <div>
          <span> Copyright Company Name &copy; 2018</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
