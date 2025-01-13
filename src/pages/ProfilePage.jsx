import { firebaseSignOut, useAuthState } from "../utilities/firebase";
import SignIn from "../components/SignIn";

import CompletedRequests from "../components/CompletedList";

const ProfilePage = () => {
  const [user] = useAuthState();

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg mb-6">
            <h1 className="text-3xl font-bold mb-2 text-center">
              Profile Page
            </h1>
            <div className="flex flex-col items-center text-gray-700">
              {/* Profile Picture Placeholder */}
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
                {/* Optional Initials */}
                <span className="text-2xl font-semibold text-gray-500">
                  {user.displayName[0]}
                </span>
              </div>
              <p className="text-lg font-semibold">{user.displayName}</p>
              <p className="text-lg">Email: {user.email}</p>
              <button
                onClick={firebaseSignOut}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Completed Requests Section */}
          <div className="w-full max-w-3xl">
            <CompletedRequests requests={[]} />
            {/* You can pass completed requests here if they are derived from user */}
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default ProfilePage;
