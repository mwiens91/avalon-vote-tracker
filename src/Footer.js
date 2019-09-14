import React from "react";

const Footer = () => (
  <footer
    style={{
      position: "absolute",
      left: "0",
      bottom: "0",
      right: "0",
      paddingBottom: "20px",
      fontSize: "13px",
      textAlign: "center",
    }}
  >
    created by{" "}
    <a
      href="https://github.com/mwiens91/"
      style={{ textDecoration: "none", color: "#0000EE" }}
    >
      Matt Wiens
    </a>
  </footer>
);

export default Footer;
