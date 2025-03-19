import React, { useState } from "react";
import {
  Bell,
  User,
  Home,
  Settings,
  BarChart,
  ShoppingCart,
  Package,
} from "lucide-react";
import ProductManage from "../screens/ProductManange";
import { Link } from "react-router-dom";
import ProductManager from "./ProductManager";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, page: "Dashboard" },
    { name: "Product Management", icon: <BarChart size={20} />, page: "AllProducts" },
    { name: "Analytics", icon: <BarChart size={20} />, page: "Analytics" },
    { name: "Add New Product", icon: <Package size={20} />, page: "Products" },
    { name: "Orders", icon: <ShoppingCart size={20} />, page: "Orders" },
    { name: "Settings", icon: <Settings size={20} />, page: "Settings" },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Total Sales", value: "$12,500" },
              { title: "New Users", value: "345" },
              { title: "Orders", value: "1,234" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-2xl font-bold mt-2">{item.value}</p>
              </div>
            ))}
             
            <a href="">Add Product</a>
          </div>
        );
     case "AllProducts":
          return  <ProductManager/>
      case "Analytics":
        return <h2 className="text-xl font-semibold">Analytics Page Content</h2>;
      case "Products":
        return <ProductManage />;
      case "Orders":
        return <h2 className="text-xl font-semibold">Orders Page Content</h2>;
      case "Settings":
        return <h2 className="text-xl font-semibold">Settings Page Content</h2>;
      default:
        return <h2 className="text-xl font-semibold">Page Not Found</h2>;
    }
  };

  return (
    <div className="flex  bg-gray-100 mt-10">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white flex flex-col p-5 transition-all duration-300 ease-in-out`}
      >
        <button className="text-white mb-6 lg:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        <h2 className={`text-2xl font-bold mb-6 ${!isSidebarOpen && "hidden"}`}>
          Admin Panel
        </h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li
                key={item.page}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                  currentPage === item.page ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setCurrentPage(item.page)}
              >
                {item.icon}
                <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
              </li>
            ))}
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
