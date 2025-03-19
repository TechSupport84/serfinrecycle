import React, { useState } from "react";
import {
  Bell,
  User,
  Home,
  Settings,
  BarChart,
  BikeIcon,
  BetweenHorizonalStartIcon,
} from "lucide-react";
import ProductManange from "../screens/ProductManange";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <p className="text-2xl font-bold mt-2">$12,500</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">New Users</h3>
              <p className="text-2xl font-bold mt-2">345</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-2xl font-bold mt-2">1,234</p>
            </div>
          </div>
        );
      case "Analytics":
        return (
        <>
        <h2 className="text-xl">Analytics Page Content</h2>

        </>
        );
      case "Products":
        return (
          <>
           <ProductManange/>
          </>
        )
      case "Orders":
        return <h2 className="text-xl">Orders Page Content</h2>;
      case "Settings":
        return <h2 className="text-xl">Settings Page Content</h2>;
      default:
        return <h2 className="text-xl">Page Not Found</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-10">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white flex flex-col p-5 transition-width duration-300 ease-in-out lg:w-64 md:w-48 sm:w-20`}
      >
        <button className="text-white mb-6 lg:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        <h2 className={`text-2xl font-bold mb-6 ${!isSidebarOpen && "hidden"}`}>
          Admin Panel
        </h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                currentPage === "Dashboard" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage("Dashboard")}
            >
              <Home size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>Dashboard</span>
            </li>
            <li
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                currentPage === "Analytics" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage("Analytics")}
            >
              <BarChart size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>Analytics</span>
            </li>
            <li
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                currentPage === "Products" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage("Products")}
            >
              <BetweenHorizonalStartIcon size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>Products</span>
            </li>
            <li
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                currentPage === "Orders" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage("Orders")}
            >
              <BikeIcon size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>Orders</span>
            </li>
            <li
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                currentPage === "Settings" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage("Settings")}
            >
              <Settings size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>Settings</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{currentPage}</h2>
          <div className="flex items-center space-x-4">
            <Bell size={24} className="text-gray-700 cursor-pointer" />
            <User size={24} className="text-gray-700 cursor-pointer" />
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default DashBoard;
