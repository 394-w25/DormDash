import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Request from "../components/Request";

const request = {
  title: "Moving In",
  description: "I need help moving in",
  location: "Lincoln",
  compensation: 10,
  timestamp: Date.now(),
};

describe("Request component", () => {
  test("should render the request information", () => {
    render(<Request request={request} />);
    screen.getByText(request.title);
    screen.getByText(request.description);
    screen.getByText(request.location, { exact: false });
    screen.getByText(request.compensation.toString(), { exact: false });
    screen.getByText(new Date(request.timestamp).toLocaleString(), {
      exact: false,
    });
  });
});
