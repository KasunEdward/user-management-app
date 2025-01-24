import { screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import DeleteUserModal from '../DeleteUserModal';
import { renderWithProviders } from '../../utils/test-utils';

describe('DeleteUserModal', () => {
  const defaultProps = {
    open: true,
    handleClose: vi.fn(),
    handleCancel: vi.fn(),
    id: '123',
  };

  test('renders the modal when open is true', () => {
    renderWithProviders(<DeleteUserModal {...defaultProps} />);
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
  });

  test('shows the loading spinner when loadingAddEdit is true', () => {
    const store = {
      users: {
        loadingAddEdit: true,
      },
    };
    renderWithProviders(<DeleteUserModal {...defaultProps} />, { preloadedState: store });
    expect(screen.getByTestId('circularProgress')).toBeInTheDocument();
  });

  test('calls handleCancel on cancel button click', () => {
    renderWithProviders(<DeleteUserModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.handleCancel).toHaveBeenCalled();
  });
});
