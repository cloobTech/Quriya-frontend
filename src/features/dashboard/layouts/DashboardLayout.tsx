import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
// import { useNavbar } from "@src/index";

const DashbordLayout: React.FC = () => {
  // const { isVisible } = useNavbar();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}

        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        <section className="flex-1  flex flex-col pt-20 p-6 ">
          {/* {isVisible && <Navbar />} */}

          <div
            className={`
 
                  bg-gray-100
                  fixed top-0 right-0 z-10
                   grid 
                  transition-all duration-300 ease-in-out z-10
                  ${isExpanded ? "left-64" : "left-16"}
                `}
          >
            <Navbar />
            <p className=" border-b border-gray-200"></p>
            <PageHeader />
          </div>
          {/* Main Content */}
          <div className="flex-1 mt-[80px]">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default DashbordLayout;
