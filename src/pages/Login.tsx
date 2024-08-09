import useStore from '../store';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface SignUpFormState {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<SignUpFormState>({
    username: '',
    password: '',
  });
  const loggedIn = useStore(state => state.loggedIn);
  const [warning, setWarning] = useState<String | null>(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_DOMAIN}api/authenticate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        toast.warning(`HTTP error: Status ${response.status}`, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
        });
        setWarning(null);
        return;
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.authenticated === true) {
          toast.success('Logged in', {
            position: 'bottom-center',
            autoClose: 2000,
            theme: 'light',
          });
          setWarning(null);
          useStore.setState({ loggedIn: true });
        } else {
          setWarning('Invalid username or password');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      {!loggedIn && (
        <div className=" mx-1 xs:mx-auto w-[calc(100%-10px)] sm:w-96 mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                Login using the demo login - <strong>demo, demo</strong>
              </p>
            </div>
            <div className="mt-5 max-w-full">
              {/* PLACE HOLDER FOR GOOGLE SOCIAL AUTHENTICATION 
              <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              type="button"
            >
              <svg
                className="w-4 h-auto"
                fill="none"
                height="47"
                viewBox="0 0 46 47"
                width="46"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign in with Google
            </button>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>*/}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      className="block text-sm mb-2 dark:text-white"
                      htmlFor="email"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <input
                        aria-describedby="email-error"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        id="text"
                        name="username"
                        required
                        type="text"
                        onChange={handleChange}
                        value={formData.username}
                      />
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          aria-hidden="true"
                          className="size-5 text-red-500"
                          fill="currentColor"
                          height="16"
                          viewBox="0 0 16 16"
                          width="16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        className="block text-sm mb-2 dark:text-white"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        aria-describedby="password-error"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        id="password"
                        name="password"
                        required
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          aria-hidden="true"
                          className="size-5 text-red-500"
                          fill="currentColor"
                          height="16"
                          viewBox="0 0 16 16"
                          width="16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="password-error"
                    >
                      8+ characters required
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                    </div>
                    <div className="ms-3">
                      <label
                        className="text-sm dark:text-white"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="m-1">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            You're logged in!
          </h1>
          <p>Check out the Orders page for a demo of nested components</p>
        </div>
      )}
      {warning && (
        <div className="mt-3 m-1 w-96 mx-auto">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
            role="alert"
          >
            <strong className="font-bold">Warning! </strong>
            <span className="block sm:inline">{warning}</span>
          </div>{' '}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
