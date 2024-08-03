import useStore from '../store';

const Login = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Mock Login Page</h1>
      <div className="mt-5">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => useStore.setState({ loggedIn: true })}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
