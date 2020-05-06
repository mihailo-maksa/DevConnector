import React from "react";

const StyleSheet = {
  footer: {
    backgroundColor: "#34393F",
    height: "85px",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    left: "0",
    bottom: "0"
  },
  copy: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold"
  }
};

const Footer = () => {
  return (
    <footer style={StyleSheet.footer}>
      <p style={StyleSheet.copy}>
        &copy; {new Date().getFullYear()} DevConnector, Inc. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
