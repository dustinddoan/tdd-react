import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import SignUpPage from "./SignUpPage";

describe("SignUpPage", () => {
  describe("Layout", () => {
    it("has  header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });

    // it('has username input', () => {
    // 	render(<SignUpPage />);
    // 	const input = screen.queryByPlaceholderText("Username");
    // 	expect(input).toBeInTheDocument();

    // })

    // it('has email input', () => {
    // 	render(<SignUpPage />);
    // 	const input = screen.queryByPlaceholderText("Email");
    // 	expect(input).toBeInTheDocument();
    // })

    it("has usernames input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for pasword input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input).toBeInTheDocument();
    });

    it("has password type for pasword repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });

    it("has Sign Up button", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });

    it("disable the button initialy", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });

  describe("Interaction", () => {
    let requestBody;
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        requestBody = req.body;
        counter++;
        return res(ctx.status(200));
      })
    );

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    beforeEach(() => {
      counter = 0;
    });

    let button;
    const setup = () => {
      render(<SignUpPage />);
      const username = screen.getByLabelText("Username");
      const email = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");

      userEvent.type(username, "user1");
      userEvent.type(email, "user1@gmail.com");
      userEvent.type(passwordInput, "P4assword");
      userEvent.type(passwordRepeatInput, "P4assword");

      button = screen.getByRole("button", { name: "Sign Up" });
    };

    it("enable Sign Up button when password and password reepat are matched", () => {
      setup();
      expect(button).toBeEnabled();
    });

    it("send username and password to backend after clicking the button", async () => {
      setup();
      userEvent.click(button);

      await screen.findByText(
        "Please check you e-mail to activate your account"
      );

      expect(requestBody).toEqual({
        username: "user1",
        email: "user1@gmail.com",
        password: "P4assword",
      });
    });

    it("disable button when there is an on going api call", async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(counter).toBe(1);
    });

    it("display spinner after clicking the submit", async () => {
      setup();

      expect(screen.queryByRole("status")).not.toBeInTheDocument();

      userEvent.click(button);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      await screen.findByText(
        "Please check you e-mail to activate your account"
      );
    });

    it("display account activation notification after successfully sign up", async () => {
      setup();
      const message = "Please check you e-mail to activate your account";
      expect(screen.queryByText(message)).not.toBeInTheDocument();

      userEvent.click(button);

      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it("hide sign up form after successful sign up", async () => {
      setup();
      const form = screen.getByTestId("form-sign-up");
      userEvent.click(button);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
      // await waitForElementToBeRemoved(form);
    });
  });
});
