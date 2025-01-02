import React from "react";
import NavBar from "../common/all/nav-bar/NavBar";
import Footer from "../common/all/Footer";
import NavBarV from "../common/all/nav-bar/NavBarV";

function UserLayout({ children, visitor }) {
  return (
    <div>
      {visitor ? <NavBarV /> : <NavBar />}

      {children}
      <Footer />
    </div>
  );
}

export default UserLayout;
