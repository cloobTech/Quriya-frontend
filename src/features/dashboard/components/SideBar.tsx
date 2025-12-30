import React, { useState, useEffect } from "react";
import BottomSideLinks from "@features/dashboard/components/BottomSideLinks";
import TopSideLinks from "@features/dashboard/components/TopSideLinks";
import { FiX } from "react-icons/fi";
// import Logo from "../assets/a.svg";

const SideBar: React.FC<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isExpanded, setIsExpanded }) => {
  const [showName, setShowName] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowName(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowName(false);
    }
  }, [isExpanded]);

  return (
    <div
      className={`z-10 relative bg-gray-100 flex flex-col justify-between transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } `}
    >
      <div
        style={{
          backgroundColor: "#fafafa",
        }}
        className={`py-18  flex flex-col justify-between p-4 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }  fixed h-screen`}
      >
        {/* Expand & Collapse Navbar */}
        <button
          title="Expand/Collapse"
          aria-label="Expand/Collapse"
          type="button"
          onClick={toggleNavbar}
          className={`p-2 rounded absolute top-4 flex items-center justify-center cursor-pointer ${
            isExpanded ? "bg-primary text-white" : "bg-white text-primary"
          }`}
        >
          {isExpanded ? (
            <FiX size={16} />
          ) : (
            // <img src={Logo} alt="Omniqle Logo" className="h-5 w-auto " />
            "L"
          )}
        </button>

        <div
          className={`absolute font-semibold text-sm top-14 transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {showName ? "Enovate Lab " : ""}
        </div>

        {/* Top Links */}
        <div className="mt-4">
          <TopSideLinks isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>

        {/* Bottom Links */}
        <div className="">
          {/* <div className="absolute bottom-4 w-full"> */}
          <BottomSideLinks
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
