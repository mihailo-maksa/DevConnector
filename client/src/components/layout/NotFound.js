import React from "react";

import section from "../../utils/section";

const NotFound = () => {
  return (
    <section className="container" style={section}>
      <h1 className="x-large text-primary" title="Page Not Found">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="lead">Sorry, this page does not exist!</p>
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Page Not Found"
        title="Page Not Found"
        style={{
          dispaly: "inline-block",
          backfroundSize: "cover",
          backgroundPosition: "center",
          width: "800px",
          height: "60vh"
        }}
      />
    </section>
  );
};

export default NotFound;
