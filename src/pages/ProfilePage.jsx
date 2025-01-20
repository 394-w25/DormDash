import { firebaseSignOut, useAuthState } from "../utilities/firebase";
import SignIn from "../components/SignIn";
import CompletedRequests from "../components/CompletedList";
import UncompletedRequests from "../components/UncompletedRequestsList";
import ProfilePicture from "../components/ProfilePicture";

const ProfilePage = () => {
  const [user] = useAuthState();

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gray-100">
          {/* Profile Section */}
          <div className="px-4 sm:px-8">
          <div className="bg-gray-100 w-full p-6 flex items-center justify-between mt-6">
            {/* column for Profile Page and user picture */}
            <div flex-row items-center>
              <h1 className="text-3xl font-bold">Profile Page</h1>
              <div className="flex items-center gap-6 mt-6">
                
                <ProfilePicture photoURL={user.photoURL} />
                <div>
                  <p className="text-lg font-semibold">{user.displayName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={firebaseSignOut}
              className="absolute top-20 absolute right-12 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
          </div>

          {/* Uncompleted Requests Section */}
          <div className="px-4 sm:px-8">
           
            <div className="bg-white w-full p-6 mt-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-left">
                Active Requests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UncompletedRequests requests={[]} />
              </div>
            </div>
          </div>
          

          {/* Completed Requests Section */}
          <div className="px-4 sm:px-8">
            <div className="bg-white w-full p-6 mt-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-left">
                Completed Requests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CompletedRequests requests={[]} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default ProfilePage;
