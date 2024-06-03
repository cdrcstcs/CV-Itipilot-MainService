import {Outlet} from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
