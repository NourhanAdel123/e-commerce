import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
