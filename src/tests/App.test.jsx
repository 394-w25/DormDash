import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("should render the navigation bar", () => {
    render(<App />);
    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});
