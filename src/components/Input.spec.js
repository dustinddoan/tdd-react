import { render } from "@testing-library/react";
import Input from "./Input";

it("has is-invalid class for input when help is set", () => {
  const { container } = render(<Input help="Error message" />);
  const input = container.querySelector("input");
  expect(input.classList.contains("is-invalid")).toBe(true);
});

it("has invalid-feedback class for span when help is set", () => {
  const { container } = render(<Input help="Error message" />);
  const span = container.querySelector("span");
  expect(span.classList.contains("invalid-feedback")).toBe(true);
});

it("does not have is-invalid class for input when help is NOT set", () => {
  const { container } = render(<Input />);
  const input = container.querySelector("input");
  expect(input.classList.contains("is-invalid")).toBe(false);
});
