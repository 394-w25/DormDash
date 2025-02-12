import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { useAuthState, signInWithGoogle } from "./utilities/firebase";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/general/Header";
import Dispatcher from "./components/Dispatcher";
import { SideNavBar } from "./components/general/SideNavBar";
import SignIn from "./pages/SignIn";
import { MobileNavBar } from "./components/general/MobileNavBar";

function App() {
  const [user] = useAuthState();

  return (
    <MantineProvider>
      <Notifications />
      <ModalsProvider>
        <BrowserRouter>
          {user ? (
            <div>
              <Header />
              <div className="flex flex-row flex-1">
                <SideNavBar />
                <MobileNavBar />
                <Dispatcher />
              </div>
            </div>
          ) : (
            <SignIn onSignIn={signInWithGoogle} />
          )}
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
