import '@testing-library/jest-dom';

// 1. Objeto mock base de ScrollTrigger
const mockScrollTrigger = {
  config: jest.fn(),
  create: jest.fn(() => ({
    kill: jest.fn(),
  })),
  isTouch: 0,
  normalizeScroll: jest.fn(),
  refresh: jest.fn(),
  sort: jest.fn(),
  getAll: jest.fn(() => []),
};

// 2. Mock de gsap/ScrollTrigger
jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  default: mockScrollTrigger,
  ScrollTrigger: mockScrollTrigger,
}));

// 3. Mock de gsap/all o gsap si también se importan desde ahí
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

  return gsapMock;
});

// 4. Mock de @gsap/react
jest.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void | (() => void)) => {
    if (typeof window !== 'undefined') {
      callback();
    }
  },
}));