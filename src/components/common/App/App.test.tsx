import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome header", () => {
  render(<App />);
  const linkElement = screen.getByText(/mocked header/i);
  expect(linkElement).toBeInTheDocument();
});
