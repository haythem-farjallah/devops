import React from "react";
import "./nav-bar.module.css";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
function NavBar() {
  const { user, logOut } = useUser();

  return (
    <div>
      <div className="container-fluid mbI-0">
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="/" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </a>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark ">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="/"
              style={{ height: 65, padding: "0 30px" }}>
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2" />
                Categories
              </h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 999 }}>
              <div className="navbar-nav w-100">
                <div className="nav-item dropdown dropright">
                  <a
                    href="/"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown">
                    Dresses <i className="fa fa-angle-right float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                    <a href="/" className="dropdown-item">
                      Men's Dresses
                    </a>
                    <a href="/" className="dropdown-item">
                      Women's Dresses
                    </a>
                    <a href="/" className="dropdown-item">
                      Baby's Dresses
                    </a>
                  </div>
                </div>
                <a href="/" className="nav-item nav-link">
                  Shirts
                </a>
                <a href="/" className="nav-item nav-link">
                  Jeans
                </a>
                <a href="/" className="nav-item nav-link">
                  Swimwear
                </a>
                <a href="/" className="nav-item nav-link">
                  Sleepwear
                </a>
                <a href="/" className="nav-item nav-link">
                  Sportswear
                </a>
                <a href="/" className="nav-item nav-link">
                  Jumpsuits
                </a>
                <a href="/" className="nav-item nav-link">
                  Blazers
                </a>
                <a href="/" className="nav-item nav-link">
                  Jackets
                </a>
                <a href="/" className="nav-item nav-link">
                  Shoes
                </a>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href="/" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse">
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <a href="/" className="nav-item nav-link active">
                    Home
                  </a>
                  <a href="/" className="nav-item nav-link">
                    Shop
                  </a>
                  <a href="/" className="nav-item nav-link">
                    Shop Detail
                  </a>

                  <a href="/" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none  d-lg-block">
                  {!user ? (
                    <>
                      {" "}
                      <Link to="/register" className=" btn btnAuth    ">
                        Sign Up
                      </Link>
                      /
                      <Link to="/login" className=" btn btnAuth mr-6    ">
                        Sign In
                      </Link>
                    </>
                  ) : (
                    <button
                      className=" btn btnAuth mr-6    "
                      onClick={() => {
                        logOut();
                        return <Navigate to="/login" />;
                      }}>
                      logOut
                    </button>
                  )}

                  <a href="/" className="btn px-0">
                    <i className="fas fa-heart text-primary pr-1" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}>
                      0
                    </span>
                  </a>
                  <a href="/" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary pr-1" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}>
                      0
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
