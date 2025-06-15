import { test, expect, describe, beforeAll, afterAll, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { format } from "date-fns";
import App from "./App.jsx";

// Kelompokkan tes yang bergantung pada tanggal
describe("Date display in App component", () => {
  // Tanggal yang akan kita gunakan untuk semua tes di blok ini
  // Diambil dari log error Anda untuk konsistensi: 15 Juni 2025
  const mockDate = new Date('2025-06-15T12:00:00');

  // Sebelum semua tes di blok ini dimulai, kita akan menggunakan waktu palsu
  beforeAll(() => {
    vi.useFakeTimers();
  });

  // Sebelum setiap tes, atur waktu sistem ke tanggal mock kita
  beforeEach(() => {
    vi.setSystemTime(mockDate);
  });

  // Setelah semua tes selesai, kembalikan ke waktu normal
  afterAll(() => {
    vi.useRealTimers();
  });

  test("renders the day of the month", () => {
    render(<App />);
    // Mencari elemen dengan teks yang sesuai format tanggal mock
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


// Tes untuk fungsionalitas aplikasi
describe("App functionality", () => {
  test("adds a new item to the list after clicking the FAB", () => {
    render(<App />);

    // 1. Cari dan klik tombol "Add New Item" (tombol +) terlebih dahulu.
    // Berdasarkan log error, tombol ini memiliki 'title', bukan placeholder.
    const fabButton = screen.getByTitle("Add New Item");
    fireEvent.click(fabButton);

    // 2. SEKARANG, setelah form muncul, cari input dan tombol tambah.
    // Kita gunakan screen.getBy... untuk mencari di seluruh dokumen.
    const input = screen.getByPlaceholderText("Add new item");
    const addButton = screen.getByTestId("add-button");

    // 3. Masukkan teks ke input
    fireEvent.change(input, { target: { value: "New Task" } });
    
    // 4. Klik tombol untuk menambahkan task
    fireEvent.click(addButton);

    // 5. Verifikasi bahwa item baru telah muncul di dalam dokumen
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});
