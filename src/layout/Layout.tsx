import { Outlet, Link } from 'react-router-dom';

import DarkToggleButton from './DarkToggleButton';

import useStore from '../store';

const Layout = () => {
  const loggedIn = useStore(state => state.loggedIn);

  const logout = () => {
    useStore.setState({ loggedIn: false });
  };

  return (
    <>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80"
              aria-label="Brand"
            >
              Simplis - a React-Spring Boot demo
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                id="hs-navbar-example-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div
            id="hs-navbar-example"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <DarkToggleButton />
              <Link
                to="/"
                className="after:block after:content-[''] after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-2 font-semibold text-gray-600  focus:outline-none focus:text-gray-400 dark:text-neutral-400  dark:focus:text-neutral-500"
              >
                Home
              </Link>
              {!loggedIn && (
                <Link
                  to="/login"
                  className="after:block after:content-[''] after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-2 font-semibold text-gray-600  focus:outline-none focus:text-gray-400 dark:text-neutral-400  dark:focus:text-neutral-500"
                >
                  Login
                </Link>
              )}
              {loggedIn && (
                <Link
                  to="/orders"
                  className="after:block after:content-[''] after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-2 font-semibold text-gray-600  focus:outline-none focus:text-gray-600 dark:text-neutral-400  dark:focus:text-neutral-500"
                >
                  Orders
                </Link>
              )}

              <Link
                to="/about"
                className="after:block after:content-[''] after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-2 font-semibold text-gray-600  focus:outline-none focus:text-gray-600 dark:text-neutral-400  dark:focus:text-neutral-500"
              >
                About
              </Link>

              {loggedIn && (
                <div
                  className="mx-2 font-medium fill-gray-600  hover:fill-gray-400 focus:outline-none focus:fill-gray-400 dark:fill-neutral-400 dark:hover:fill-neutral-500 dark:focus:fill-neutral-500"
                  onClick={logout}
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: '1em',
                      height: '1em',
                      verticalAlign: 'middle',
                      overflow: 'hidden',
                    }}
                    viewBox="0 0 448 512"
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="bg-white flex flex-col min-h-[calc(100vh-60px)] py-3 dark:bg-neutral-800 dark:text-neutral-400 ">
        <div className="w-full md:w-3/5 lg:w-1/2 container mx-auto bg-white py-3 dark:bg-neutral-800 dark:text-neutral-400 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
