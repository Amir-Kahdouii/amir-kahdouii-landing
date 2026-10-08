import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { metadata } from '../app/layout';

describe('Project Foundation & Persian RTL Shell (Smoke Test)', () => {
  it('renders the base Persian RTL page container without throwing errors', () => {
    render(<Home />);

    // The primary landing container must exist in the document
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();

    // Must be styled with light theme container class and have RTL direction
    expect(mainContainer).toHaveAttribute('dir', 'rtl');
    expect(mainContainer).toHaveAttribute('lang', 'fa');
  });

  it('exports root layout metadata configured for Persian language', () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
    // Verify default title is not the unconfigured default "Create Next App"
    expect(metadata.title).not.toBe('Create Next App');
  });
});
