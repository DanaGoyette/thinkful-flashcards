import React, { Fragment } from "react";
import { Link } from "react-router-dom";

/**
 * This component builds a series of links to "parent" portions of the UI.
 * The link for "Home" is always implied.
 * @typedef {string | {title: string, location: string} pathPiece
 * @param {Object} param0
 * @param {pathPiece | pathPiece[]} param0.path
 */
export default function Breadcrumbs({ path = [] }) {
  const pieces = Array.isArray(path) ? path : [path];

  return (
    <div className="flexRowStart">
      <Link key="home-link" to="/">
        🏠 Home
      </Link>
      {/* If path is empty (which would be a bug), make it clear we aren't on home. */}
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
