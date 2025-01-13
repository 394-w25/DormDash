import { useNavigate } from 'react-router-dom';
import {
  signInWithGoogle,
  firebaseSignOut,
  useAuthState,
} from "../utilities/firebase";


const HomePage = () => {
  const [user] = useAuthState();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to DormDash</h1>
      {user ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
          <p>Welcome, {user.displayName}!</p>
          <button
            onClick={() => navigate('/post')}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#C39BD3',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Post New Request
          </button>
          <button
            onClick={firebaseSignOut}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#db7c98",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#81a7d8",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default HomePage;
