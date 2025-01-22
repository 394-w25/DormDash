import { firebaseSignOut, useAuthState } from "../utilities/firebase";
import React, { useRef } from "react";
import SignIn from "../components/SignIn";
import CompletedRequests from "../components/CompletedList";
import UncompletedRequests from "../components/UncompletedRequestsList";
import ProfilePicture from "../components/ProfilePicture";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const [user] = useAuthState();

  const activeRef = useRef(null);
  // const pendingRef = useRef(null);
  const completedRef = useRef(null);
  const location = useLocation();

  const scrollToSection = (section) => {
    if (section === "active" && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "completed" && completedRef.current) {
      completedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {user ? (
        <div className="mr-4 flex-1 max-h-screen max-w-screen">
          {/* Profile Section */}
          <div>
            <div className="w-full flex items-center justify-between mt-4">
              {/* column for Profile Page and user picture */}
              <div flex-row items-center>
                <h2
                  className="text-2xl font-bold mb-4 text-left"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Profile Page
                </h2>
                <div className="flex items-center gap-6 mt-6">
                  <ProfilePicture photoURL={user.photoURL} />
                  <div>
                    <p
                      className="text-lg font-semibold"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {user.displayName}
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={firebaseSignOut}
                className="absolute top-16 absolute right-4 px-6 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Requests Sections */}
          <div className="mt-4 space-y-4">
            {/* Active Requests */}
            <div
              ref={activeRef}
              className="bg-blue-50 flex-1 p-6 rounded-lg shadow-lg"
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Active Requests
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <UncompletedRequests requests={[]} />
              </div>
            </div>

            {/* Pending Requests */}
            {/* <div ref={pendingRef} className="bg-yellow-50 flex-1 p-6 rounded-lg shadow-lg">
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Pending Requests
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <UncompletedRequests requests={[]} />
              </div>
            </div> */}

            {/* Completed Requests */}
            <div
              ref={completedRef}
              className="bg-green-50 flex-1 p-6 rounded-lg shadow-lg"
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
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
