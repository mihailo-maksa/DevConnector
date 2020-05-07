import React, { Fragment, memo } from "react";
import { useMediaQuery } from "react-responsive";

import section from "../../utils/section";

const ErrorPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <Fragment>
      <div style={{ height: "100px" }} />
      <section className="container" style={section}>
        <h1
          className="x-large text-primary not-found-title"
          title="Page Not Found"
          style={{ textAlign: "center" }}
        >
          <i className="fas fa-exclamation-triangle" /> Sorry, This Page is
          Broken!
        </h1>
        <p className="lead" style={{ textAlign: "center" }}>
          <b>Come back later </b>- we are working on solving this problem right
          now!
        </p>
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
    </Fragment>
  );
};

export default memo(ErrorPage);
