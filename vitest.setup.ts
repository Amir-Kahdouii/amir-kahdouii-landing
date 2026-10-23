import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Vazirmatn: () => ({
    className: 'font-vazirmatn',
    variable: '--font-vazirmatn',
    style: { fontFamily: 'Vazirmatn' },
  }),
}));

vi.mock('next/font/local', () => ({
  default: () => ({
    className: 'font-vazirmatn',
    variable: '--font-vazirmatn',
    style: { fontFamily: 'Vazirmatn' },
  }),
}));
