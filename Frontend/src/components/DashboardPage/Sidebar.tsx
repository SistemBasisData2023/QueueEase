import React, { useState } from 'react';

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="fixed inset-y-0 left-1 bg-base-300 w-1/2 md:w-64"
      style={{ borderRadius: '30px' }}
    >
      <div className="navbar">
        <div className="flex-1">
          <img
            src="src\assets\Logo.svg"
            className="h-8 mr-3 mt-4 ml-4"
            alt="QueueEase Logo"
          />
        </div>
      </div>
      <ul className="py-5">
        <li className="px-4 py-2 text-xl font-medium">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '10px 16px',
              borderRadius: '30px', // Increased border radius for more rounded buttons
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6359E9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.border = 'none';
            }}
            onClick={() => (window.location.href = '/register')}
          >
            <img
              src="src\assets\icon-park-solid_add.png"
              className="h-6 mr-2"
              alt="Icon"
              style={{ alignSelf: 'center' }}
            />
            <span>Add Account</span>
          </button>
        </li>
        <li className="px-4 py-2 text-xl font-medium">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '10px 16px',
              borderRadius: '30px', // Increased border radius for more rounded buttons
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6359E9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.border = 'none';
            }}
          >
            <img
              src="src\assets\bar-line-chart.png"
              className="h-6 mr-2"
              alt="Icon"
              style={{ alignSelf: 'center' }}
            />
            <span>Analytics</span>
          </button>
        </li>
        <li className="px-4 py-2 text-xl font-medium">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '10px 16px',
              borderRadius: '30px', // Increased border radius for more rounded buttons
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6359E9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.border = 'none';
            }}
          >
            <img
              src="src\assets\Teller.png"
              className="h-6 mr-2"
              alt="Icon"
              style={{ alignSelf: 'center' }}
            />
            <span>Teller</span>
          </button>
        </li>
        <li className="mt-20 pt-80 left-1 px-4 py-2 text-xl font-medium">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '10px 16px',
              borderRadius: '30px', // Increased border radius for more rounded buttons
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6359E9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.border = 'none';
            }}
          >
            <img
              src="src\assets\LogOut.png"
              className="h-6 mr-2"
              alt="Icon"
              style={{ alignSelf: 'center' }}
            />
            <span>Log Out</span>
          </button>
        </li>
        <li className="fixed bottom-8 left-1 px-4 text-xl font-medium">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="src\assets\Profile.png"
              className="h-16 w-16 mr-4 mb-5"
              alt="Profile"
              style={{ alignSelf: 'center', marginBottom: '5px' }}
            />
            <div>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '21px',
                  marginTop: '-5px',
                }}
              >
                Nama Admin
              </span>
              <br />
              <span style={{ fontSize: '14px' }}>Web Developer</span>
            </div>
            <div className="dropdown dropdown-hover">
              <img
                src="src\assets\Dropdown.png"
                className="h-2 w-3 ml-2.5 mb-6"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
