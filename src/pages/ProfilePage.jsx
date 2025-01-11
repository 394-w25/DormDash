import {
  signInWithGoogle,
  firebaseSignOut,
  useAuthState,
} from "../utilities/firebase";

import CompletedRequests from "../components/CompletedList";

const ProfilePage = () => {
  //   const [user] = useAuthState();

  const user = [
    {
      user: {
        id: "rjhmWHDlCKNK085asZXjf1OtgvZ2",
        displayName: "Darin",
        email: "darinweberr@gmail.com",
        requests: {
          testRequest: {
            compensation: 0,
            description: "This is a 1 test request.",
            location: "Northwestern",
            timestamp: 1736463455002,
            title: "Test request",
            isFulfilled: true,
          },
        },
      },
    },
    {
      user: {
        id: "rjhmWHDlCKNK085asZXjf1OtgvZ2",
        displayName: "Darin",
        email: "darinweberr@gmail.com",
        requests: {
          testRequest: {
            compensation: 0,
            description: "This is a 2 test request.",
            location: "Northwestern",
            timestamp: 1736463455002,
            title: "Test request",
            isFulfilled: false,
          },
        },
      },
    },
    {
      user: {
        id: "rjhmWHDlCKNK085asZXjf1OtgvZ2",
        displayName: "Darin",
        email: "darinweberr@gmail.com",
        requests: {
          testRequest: {
            compensation: 0,
            description: "This is a 3 test request.",
            location: "Northwestern",
            timestamp: 1736463455002,
            title: "Test request",
            isFulfilled: true,
          },
        },
      },
    },
  ];

  const fulfilledRequests = user
    .map((item) => {
      const { requests } = item.user;
      const testRequest = requests.testRequest;
      return testRequest.isFulfilled ? testRequest : null;
    })
    .filter((request) => request !== null);

  const currentUser = user[0].user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Profile Page</h1>
        <div className="flex flex-col items-center text-gray-700">
          {/* Profile Picture Placeholder */}
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
            {/* Optional Initials */}
            <span className="text-2xl font-semibold text-gray-500">
              {currentUser.displayName[0]}
            </span>
          </div>
          <p className="text-lg font-semibold">{currentUser.displayName}</p>
          <p className="text-lg">Email: {currentUser.email}</p>
        </div>
      </div>

      {/* Loading the Requests Section */}
      <div className="w-full max-w-3xl">
        <CompletedRequests requests={fulfilledRequests} />
      </div>
    </div>
  );
};

export default ProfilePage;
