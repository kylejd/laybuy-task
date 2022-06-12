import { fireEvent, render, screen } from "@testing-library/react";
import Login from "@/pages/login";

describe("login", () => {
  it("renders a login form and submit button", () => {
    render(<Login />);

    screen.getByRole("button", {
      name: /Sign In/i,
    });
    screen.getByText("Email Address");
    screen.getByText("Password");
  });

  it("shows invalid label if failed login", async () => {
    render(<Login />);

    const button = screen.getByRole("button", {
      name: /Sign In/i,
    });
    fireEvent.click(button);

    await screen.findByText("Invalid login, please try again.");
  });
});
