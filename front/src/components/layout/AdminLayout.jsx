import React, { useState } from "react";
import SideBar from "../common/all/side-bar/SideBar";
import NavBarAdmin from "../common/all/NavBarAdmin";

function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen  overflow-hidden bg-[#fcf4e0]">
      <SideBar open={open} setOpen={() => setOpen(!open)} />
      <section
        className="home-section h-screen "
        style={{
          left: open ? "250px" : "78px",
          width: open ? "calc(100% - 250px)" : "calc(100% - 78px)",
        }}>
        <NavBarAdmin />
        <div className="" style={{ width: "100%", padding: "20px 40px" }}>
          {children}
        </div>
      </section>
    </div>
  );
}

export default AdminLayout;
