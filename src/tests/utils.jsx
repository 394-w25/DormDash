import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";

// https://testing-library.com/docs/react-testing-library/setup/#custom-render
const customRender = (ui) =>
  render(<>{ui}</>, {
    wrapper: ({ children }) => (
      <MantineProvider>
        <Notifications />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    ),
  });

export * from "@testing-library/react";
export { customRender as render };
