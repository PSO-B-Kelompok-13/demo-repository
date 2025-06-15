import { test, expect, describe, beforeAll, afterAll, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { format } from "date-fns";
import App from "./App.jsx";

// Tes tanggal (sudah benar dan tidak perlu diubah)
describe("Date display in App component", () => {
  const mockDate = new Date('2025-06-15T12:00:00');
  beforeAll(() => {
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.setSystemTime(mockDate);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  test("renders the day of the month", () => {
    render(<App />);
    expect(screen.getByText(format(mockDate, "d"))).toBeInTheDocument();
  });

  test("renders the month", () => {
    render(<App />);
    expect(screen.getByText(format(mockDate, "MMM"))).toBeInTheDocument();
  });

  test("renders the year", () => {
    render(<App />);
    expect(screen.getByText(format(mockDate, "y"))).toBeInTheDocument();
  });

  test("renders the weekday", () => {
    render(<App />);
    expect(screen.getByText(format(mockDate, "EEEE"))).toBeInTheDocument();
  });
});


// Tes fungsionalitas aplikasi
describe("App functionality", () => {
  test("adds a new item to the list after clicking the FAB", () => {
    render(<App />);

    // 1. Klik tombol +
    const fabButton = screen.getByTitle("Add New Item");
    fireEvent.click(fabButton);

    // 2. Cari input dengan placeholder yang BENAR
    const input = screen.getByPlaceholderText("What do you need to do?");
    
    // 3. Cari tombol submit dengan teks yang terlihat oleh pengguna.
    // getByRole adalah cara yang paling direkomendasikan.
    const addButton = screen.getByRole('button', { name: /add task/i });

    // 4. Masukkan teks dan klik tombol tambah
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    // 5. Verifikasi hasilnya
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});
