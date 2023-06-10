function Navbar() {
  return (
    <nav className="bg-transparent fixed w-full z-20 top-0 left-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-12">
        <a className="flex items-center">
          <img
            src="src\assets\Logo.svg"
            className="h-8 mr-3"
            alt="QueueEase Logo"
          />
        </a>
        <div
          className="items-center hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                Queue
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
          </ul>
          <div className="ml-5 mr-auto">
            <button className="px-4 py-2 text-white bg-yellow-primary">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
