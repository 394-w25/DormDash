import { signInWithGoogle } from "../utilities/firebase";

const SignIn = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left section with image */}
      <div
        className="w-3/4 hidden lg:flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('signin.png')` }}
      ></div>

      {/* Right section with sign-in */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="px-8">
          <h2
            className="text-xl mb-4 "
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Welcome to
          </h2>
          <h1
            className="text-5xl mb-6"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            DormDash
          </h1>
          <button
            onClick={signInWithGoogle}
            className="mt-4 px-6 py-2 bg-white rounded-lg shadow-md transition flex items-center justify-center"
            style={{
              borderWidth: "2px", // Make the border thicker
              fontFamily: "Lato, sans-serif",
            }}
          >
            <img src="/google.png" alt="Google icon" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
