import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ active, last, path, second, paths }) {
  return (
    <div
      className="container-fluid"
      style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="row px-xl-5">
        <div className="col-12">
          <nav
            className="breadcrumb bg-light mb-30 "
            style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            <Link to={"/home"} className="breadcrumb-item text-dark" href="#">
              Home
            </Link>
            {last ? (
              <Link to={path} className="breadcrumb-item text-dark" href="#">
                {last}
              </Link>
            ) : (
              <></>
            )}
            {second ? (
              <Link to={paths} className="breadcrumb-item text-dark" href="#">
                {second}
              </Link>
            ) : (
              <></>
            )}

            <span className="breadcrumb-item active">{active}</span>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
