import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("index", () => {
  it("renders a greeting and sign out button", () => {
    render(<Home />);

    screen.getByText("Hello!");
    screen.getByText("Sign Out");
  });
});
