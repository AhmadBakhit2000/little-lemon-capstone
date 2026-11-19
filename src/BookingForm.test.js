import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

test("Renders the BookingForm labels correctly", () => {
  render(<BookingForm availableTimes={["17:00", "18:00"]} onSubmit={jest.fn()} />);
  const nameLabel = screen.getByLabelText(/Full Name/i);
  const dateLabel = screen.getByLabelText(/Choose Date/i);
  expect(nameLabel).toBeInTheDocument();
  expect(dateLabel).toBeInTheDocument();
});

test("Shows validation error when submitting empty name", () => {
  const mockSubmit = jest.fn();
  render(<BookingForm availableTimes={["17:00", "18:00"]} onSubmit={mockSubmit} />);
  
  const submitButton = screen.getByRole("button", { name: /On Click/i });
  fireEvent.click(submitButton);

  expect(screen.getByText(/Please enter a valid full name/i)).toBeInTheDocument();
  expect(mockSubmit).not.toHaveBeenCalled();
});

test("Submits form when valid data is entered", () => {
  const mockSubmit = jest.fn();
  render(<BookingForm availableTimes={["17:00", "18:00"]} onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText(/Full Name/i), {
    target: { value: "Ahmed Hussein" },
  });
  fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
    target: { value: 4 },
  });

  const submitButton = screen.getByRole("button", { name: /On Click/i });
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalledTimes(1);
});

