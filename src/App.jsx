import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Nav from "./components/Nav";
import Dispatcher from "./components/Dispatcher";

function App() {
  return (
    <MantineProvider>
      <Nav />
      <Dispatcher />
    </MantineProvider>
  );
}

export default App;
