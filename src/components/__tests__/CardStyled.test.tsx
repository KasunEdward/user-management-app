import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import CardStyled from '../CardStyled';
import '@testing-library/jest-dom';

describe('renders a message', () => {
    it('renders a message', () => {
        render(<CardStyled title="Test Title" value={40}/>);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});