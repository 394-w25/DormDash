import { describe } from "vitest";
import { render, screen } from "./utils.jsx";
import Request from "../components/Request";

const request = {
  title: "Moving In",
  description: "I need help moving in",
  location: "Lincoln",
  timestamp: Date.now(),
  tags: ["Buy", "Sell", "Borrow", "Transportation", "Cleaning", "Other"],
};

describe("Request component", () => {
  test("should render the request information", () => {
    render(<Request request={request} />);
    screen.getByText(request.title);
    screen.getByText(request.description);
    screen.getByText(new Date(request.timestamp).toLocaleDateString(), {
      exact: false,
    });
    request.tags.forEach((tag) => screen.getByText(tag, { exact: false }))
  });
});
