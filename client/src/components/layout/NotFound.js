import React, { memo } from "react";
import { useMediaQuery } from "react-responsive";

import section from "../../utils/section";

const NotFound = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <section className="container" style={section}>
      <h1
        className="x-large text-primary not-found-title"
        title="Page Not Found"
      >
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="lead">Sorry, this page does not exist!</p>
      <img
        className="img-not-found"
        src="https://i.imgur.com/qIufhof.png"
        alt="Page Not Found"
        title="Page Not Found"
        style={{
          display: "inline-block",
          backfroundSize: "cover",
          backgroundPosition: "center",
          width: isMobile ? "400px" : "700px",
          height: isMobile ? "50vh" : "60vh"
        }}
      />
    </section>
  );
};

export default memo(NotFound);
