import { signInWithGoogle } from "../utilities/firebase";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        You must be signed in to view this page.
      </h1>
      <button
        onClick={signInWithGoogle}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
