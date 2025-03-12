import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { BiSolidUserAccount, BiLogIn, BiUserPlus ,BiLogOut} from 'react-icons/bi';
import { MdMonetizationOn, MdSell } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import { GrOrderedList } from 'react-icons/gr'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import CartNumber from '../components/CartNumber';
import { useNavigate } from 'react-router-dom';




const classNames = (...classes) => classes.filter(Boolean).join(' ');

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const nagivate = useNavigate()
  const {user, logout} = useAuth()
  const cartItems = useSelector((state) => state.cart.value);


  const navigation = [
    { name: 'Sell', iconsName: <MdSell className="size-5 mr-2" />, href: '/sell' },
    { name: 'Subscribe', iconsName: <MdMonetizationOn  className="size-5 mr-2" />, href: '/subscribe' },
    { name: 'Account', iconsName: <BiSolidUserAccount className="size-5 mr-2" />, href: '/account' },
    { name: 'Cart', iconsName: <CartNumber carts={cartItems.length}/>, href: '/cart' },
  ];
  
  

const homeUrl = ()=>{
   nagivate("/")
}

const userLogout = ()=>{
  logout()
}
  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center" onClick={homeUrl}>
                  <span className="text-orange-800 text-4xl font-bold">Ser</span>
                  <span className="text-green-200 text-2xl font-bold animate-pulse mr-5">fin</span>
                  <input
                    type="search"
                    placeholder="Search for Products"
                    className="p-2 bg-gray-800 border border-gray-500 rounded-md w-[200px] sm:w-[250px] text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex space-x-4 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item.iconsName} {item.name}
                  </Link>
                ))}
              </div>

              {/* Profile Dropdown Menu */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white">
                    <img
                      alt="Profile"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <Menu.Item>
                      {({ active }) => (
                        <div className={classNames(active && 'bg-gray-100', 'px-4 py-2 text-sm text-gray-700')}>
                           {user? user.username: " "}
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/ordered" className={classNames(active && 'bg-gray-100', 'flex items-center px-4 py-2 text-sm text-gray-700')}>
                          < GrOrderedList  className="size-5 mr-2" /> Orderd Items
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/register" className={classNames(active && 'bg-gray-100', 'flex items-center px-4 py-2 text-sm text-gray-700')}>
                          <BiUserPlus className="size-5 mr-2" /> Register
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/login"  className={classNames(active && 'bg-gray-100', 'flex items-center px-4 py-2 text-sm text-gray-700')}>
                          <BiLogIn className="size-5 mr-2" /> Login
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/#" onClick={userLogout}  className={classNames(active && 'bg-gray-100', 'flex items-center px-4 py-2 text-sm text-gray-700')}>
                          <BiLogOut className="size-5 mr-2" /> Logout
                        </Link>
                      )}
                    </Menu.Item>

                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button key={item.name} as={Link} to={item.href} className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  {item.iconsName} {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
