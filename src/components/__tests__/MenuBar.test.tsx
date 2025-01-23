import { screen} from '@testing-library/react';
import MenuBar from '../MenuBar/index';
import { renderWithProviders } from '../../utils/test-utils';
import { describe, expect, it } from 'vitest';


describe('MenuBar', () => {
  it('renders correctly', () => {
    renderWithProviders(<MenuBar />);
    const menuElement = screen.getByText(/User Management App/i);
    expect(menuElement).toBeInTheDocument();
  });

//   test('toggles mobile menu on icon click', () => {
//     renderWithProviders(<MenuBar />);
//     const menuIcon = screen.getByLabelText(/open drawer/i);
//     fireEvent.click(menuIcon);
//     const menuElement = screen.getByText(/Menu/i);
//     expect(menuElement).toBeInTheDocument();
//   });

//   test('toggles theme mode on switch click', () => {
//     const toggleMode = jest.fn();
//     render(
//       <ThemeContext.Provider value={{ mode: 'light', toggleMode }}>
//         <MenuBar />
//       </ThemeContext.Provider>
//     );
//     const switchElement = screen.getByRole('checkbox');
//     fireEvent.click(switchElement);
//     expect(toggleMode).toHaveBeenCalled();
//   });

//   test('renders navigation items correctly', () => {
//     renderWithProviders(<MenuBar />);
//     const navItem = screen.getByText(/Home/i);
//     expect(navItem).toBeInTheDocument();
//   });
});
