import React from 'react';
import { render, screen } from '@testing-library/react';

// 1. Mock de ScrollTrigger (los mocks van dentro de la función para evitar TDZ/Hoisting)
jest.mock('gsap/ScrollTrigger', () => {
  const mockScrollTrigger = {
    config: jest.fn(),
    create: jest.fn(() => ({ kill: jest.fn() })),
    isTouch: 0,
    normalizeScroll: jest.fn(),
    refresh: jest.fn(),
    sort: jest.fn(),
    getAll: jest.fn(() => []),
  };

  return {
    __esModule: true,
    default: mockScrollTrigger,
    ScrollTrigger: mockScrollTrigger,
  };
});

// 2. Mock de GSAP
jest.mock('gsap', () => {
  const gsapMock: Record<string, unknown> = {
    registerPlugin: jest.fn(),
    set: jest.fn(),
    fromTo: jest.fn(),
    to: jest.fn(),
    from: jest.fn(),
    timeline: jest.fn(() => ({
      to: jest.fn().mockReturnThis(),
      fromTo: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      progress: jest.fn().mockReturnThis(),
      kill: jest.fn(),
    })),
    utils: {
      toArray: jest.fn((selector: string | Element[]) => {
        if (typeof selector === 'string') {
          return Array.from(document.querySelectorAll(selector));
        }
        return Array.isArray(selector) ? selector : [selector];
      }),
    },
  };

  (gsapMock.to as jest.Mock).mockReturnValue(gsapMock);
  (gsapMock.from as jest.Mock).mockReturnValue(gsapMock);
  (gsapMock.fromTo as jest.Mock).mockReturnValue(gsapMock);

  return {
    __esModule: true,
    default: gsapMock,
    ...gsapMock,
  };
});

// 3. Importación de componentes e instancias después de los mocks
import ServicesSection from '../components/ServicesSection';
import ScrollTrigger from 'gsap/ScrollTrigger';

describe('ServicesSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza el encabezado de la sección', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText(/SERVICIOS/i)).toBeInTheDocument();
  });

  test('Renderiza los servicios configurados', () => {
    render(<ServicesSection />);
    
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  test('Ejecuta ScrollTrigger.refresh al montar', () => {
    render(<ServicesSection />);

    expect(ScrollTrigger.refresh).toHaveBeenCalled();
  });
});