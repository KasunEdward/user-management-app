import { describe, test, expect, vitest } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonStyled from '../ButtonStyled/index';

describe('ButtonStyled', () => {
  test('renders correctly with default props', () => {
    render(<ButtonStyled>Click Me</ButtonStyled>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('renders correctly with outlined prop', () => {
    render(<ButtonStyled outlined>Click Me</ButtonStyled>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButton-outlined');
  });

  test('renders correctly with icon', () => {
    render(<ButtonStyled icon={<span>Icon</span>}>Click Me</ButtonStyled>);
    const iconElement = screen.getByText('Icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders correctly with different color', () => {
    render(<ButtonStyled color="primary">Click Me</ButtonStyled>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButton-containedPrimary');
  });

  test('handles click events', () => {
    const handleClick = vitest.fn();
    render(<ButtonStyled onClick={handleClick}>Click Me</ButtonStyled>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders correctly with different type', () => {
    render(<ButtonStyled type="submit">Submit</ButtonStyled>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
