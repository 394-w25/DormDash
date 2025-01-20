import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Nav from "./components/Nav";
import Dispatcher from "./components/Dispatcher";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Nav />
        <Dispatcher />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
