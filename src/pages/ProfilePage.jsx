import { firebaseSignOut, useAuthState } from "../utilities/firebase";
import SignIn from "../components/SignIn";
import CompletedRequests from "../components/CompletedList";
import UncompletedRequests from "../components/UncompletedRequestsList";
import InitialsPicture from "../components/InitialsPicture";

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
              <InitialsPicture displayName={user.displayName} />
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

          {/* Uncompleted Requests Section */}
          <div className="w-full max-w-3xl mb-6">
            <UncompletedRequests requests={[]} />
          </div>

          {/* Completed Requests Section */}
          <div className="w-full max-w-3xl">
            <CompletedRequests requests={[]} />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default ProfilePage;
