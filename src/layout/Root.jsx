import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "7em" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
