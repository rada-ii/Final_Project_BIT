import React from "react";
import AdminNav from "../components/AdminNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function RootAdmin() {
  return (
    <>
      <AdminNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootAdmin;
