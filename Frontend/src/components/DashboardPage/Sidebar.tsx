import React, { useState } from 'react';

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed inset-y-0 left-0 z-10 bg-base-200 w-1/2 md:w-64">
      <div className="navbar">
        <div className="flex-1">
          <a className="text-xl text-white font-bold">QueueEase</a>
        </div>
      </div>
      <ul className="py-5">
        <li className="px-4 py-2 text-xl font-medium">Home</li>
        <li className="px-4 py-2 text-xl font-medium">Dashboard</li>
        <li className="px-4 py-2 text-xl font-medium">Support</li>
        <li className="px-4 py-2 text-xl font-medium">Data</li>
        <li className="relative">
          <label
            htmlFor="settings-dropdown"
            className="btn btn-ghost m-1 text-xl font-medium capitalize"
            onClick={toggleDropdown}
          >
            Settings
          </label>
          <input type="checkbox" id="settings-dropdown" className="hidden" />
          <div
            className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute ${
              isDropdownOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="menu compact">
              <li>
                <a>Account</a>
              </li>
              <li>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
