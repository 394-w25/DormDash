import { describe, test, vi } from "vitest";
import { render, screen } from "./utils.jsx";
import App from "../App";
import { useAuthState, useDbData } from "../utilities/firebase";

vi.mock("../utilities/firebase", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useAuthState: vi.fn(),
    useDbData: vi.fn(),
  };
});

describe("App component", () => {
  test("should not render header and navsidebar before sign-in", () => {
    useAuthState.mockReturnValue([null]); // signed out
    useDbData.mockReturnValue([
      {
        users: {
          user1: {
            requests: {
              request1: {
                title: "Test Request 1",
                description: "Test Description 1",
                compensation: 100,
                tags: ["Buy"],
                timestamp: Date.now(),
              },
            },
          },
        },
      },
      null,
    ]);

    render(<App />);

    expect(screen.queryByRole("header")).toBeNull();
    expect(screen.queryByRole("desktop-navigation")).toBeNull();
  });

  test("should render header and navsidebar after sign-in", () => {
    useAuthState.mockReturnValue([{ uid: "123", displayName: "Test User" }]); // signed in
    useDbData.mockReturnValue([
      {
        users: {
          user1: {
            requests: {
              request1: {
                title: "Test Request 1",
                description: "Test Description 1",
                compensation: 100,
                tags: ["Buy"],
                timestamp: Date.now(),
              },
            },
          },
        },
      },
      null,
    ]);

    render(<App />);

    expect(screen.getByRole("header")).not.toBeNull();
    expect(screen.getByRole("navigation")).not.toBeNull();
  });
});
