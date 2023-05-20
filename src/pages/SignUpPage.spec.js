import { screen, render } from "@testing-library/react";
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

		it('has usernames input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Username');
			expect(input).toBeInTheDocument();
		})

		it('has email input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Email');
			expect(input).toBeInTheDocument();
		})

		it('has password input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input).toBeInTheDocument();
		})

		it('has password type for pasword input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input.type).toBe("password");
		})

		it('has password repeat input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeat');
			expect(input).toBeInTheDocument();
		})

		it('has password type for pasword repeat input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeat');
			expect(input.type).toBe("password");
		})

		it('has Sign Up button', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', {name: 'Sign Up'});
			expect(button).toBeInTheDocument();
		})

		it('disable the button initialy', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', {name: 'Sign Up'});
			expect(button).toBeDisabled();
		})

	})
});
