import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet></Outlet>
      <div className="pt-20">
      <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
