import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ path = [] }) {
  const pieces = Array.isArray(path) ? path : [path];

  return (
    <div className="flexRowStart">
      <Link key="home-link" to="/">
        🏠 Home
      </Link>
      {(!pieces || pieces.length === 0) && <span>/</span>}
      {pieces &&
        pieces.length > 0 &&
        pieces.map((piece, num) => {
          const title = typeof piece === "string" ? piece : piece.title;
          const location =
            typeof piece === "string" ? undefined : piece.location;
          return (
            <Fragment key={num}>
              <span>/</span>
              {location && <Link to={location}>{title}</Link>}
              {!location && <span>{title}</span>}
            </Fragment>
          );
        })}
    </div>
  );
}
