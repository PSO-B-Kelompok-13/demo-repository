import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Item from './item'; // Pastikan path ini benar
import { useAppReducer } from '../AppContext'; // Pastikan path ini benar

// Mocking useAppReducer
vi.mock('../AppContext', () => ({
  useAppReducer: vi.fn(),
}));

describe('Item Component', () => {
  let dispatchMock;

  beforeEach(() => {
    // Siapkan mock function untuk setiap tes
    dispatchMock = vi.fn();
    useAppReducer.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    // Bersihkan semua mock setelah setiap tes
    vi.clearAllMocks();
  });

  // Data item dasar untuk tes
  const item = {
    id: 1,
    key: 1, // Tambahkan properti key untuk menghilangkan warning
    text: 'Test item',
    status: 'pending',
  };

  it('dispatches DELETE_ITEM when delete button is clicked', () => {
    // UBAH: Menggunakan getByTitle untuk mencari tombol
    const { getByTitle } = render(<Item item={item} key={item.id} />);
    const deleteButton = getByTitle('Delete'); // Cari tombol berdasarkan title="Delete"
    
    fireEvent.click(deleteButton);

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'DELETE_ITEM', item });
  });

  it('dispatches UPDATE_ITEM with paused status when pause button is clicked', () => {
    // UBAH: Menggunakan getByTitle untuk mencari tombol
    const { getByTitle } = render(<Item item={item} key={item.id} />);
    const pauseButton = getByTitle('Pause'); // Cari tombol berdasarkan title="Pause"
    
    fireEvent.click(pauseButton);

    expect(dispatchMock).toHaveBeenCalledWith({ 
      type: 'UPDATE_ITEM', 
      item: { ...item, status: 'paused' } 
    });
  });

  it('dispatches UPDATE_ITEM with pending status when resume button is clicked', () => {
    const pausedItem = { ...item, status: 'paused' };
    
    // UBAH: Menggunakan getByTitle untuk mencari tombol
    const { getByTitle } = render(<Item item={pausedItem} key={pausedItem.id} />);
    const resumeButton = getByTitle('Resume'); // Cari tombol berdasarkan title="Resume"
    
    fireEvent.click(resumeButton);

    expect(dispatchMock).toHaveBeenCalledWith({ 
      type: 'UPDATE_ITEM', 
      item: { ...pausedItem, status: 'pending' } 
    });
  });
});