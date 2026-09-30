import { render, screen, act } from '@testing-library/react';
import SelectedWork from '../components/ProjectsCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

describe('SelectedWork / ProjectsCarousel Component', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    jest.clearAllMocks();
    // Simular dimensiones estándar de escritorio por defecto
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: originalInnerHeight });
  });

  test('renderiza el título y la estructura del portafolio correctamente', () => {
    render(<SelectedWork />);

    expect(screen.getByText(/PORTAFOLIO/i)).toBeInTheDocument();
    expect(screen.getByText(/Proyectos Destacados/i)).toBeInTheDocument();
    expect(screen.getByText(/\[ Haz scroll para explorar \]/i)).toBeInTheDocument();
  });

  test('renderiza todas las tarjetas de proyectos con sus títulos y descripciones', () => {
    render(<SelectedWork />);

    // Se usa getAllByText ya que los nombres aparecen en la vista previa y en el overlay
    expect(screen.getAllByText('DeskHub')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Restaurante La Ruda')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Monitoreo de Cultivos')[0]).toBeInTheDocument();

    // Verificar presencia de tecnologías/tags
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
  });

  test('renderiza los botones para solicitar/ver casos de estudio', () => {
    render(<SelectedWork />);

    const buttons = screen.getAllByRole('button', { name: /Ver caso de estudio/i });
    expect(buttons.length).toBe(3);
  });

  test('inicializa las animaciones de GSAP y ScrollTrigger al montar', () => {
    render(<SelectedWork />);

    expect(gsap.timeline).toHaveBeenCalled();
    expect(ScrollTrigger.create).toHaveBeenCalled();
  });

  test('actualiza las dimensiones del viewport al cambiar el tamaño de ventana (resize)', () => {
    render(<SelectedWork />);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(gsap.utils.toArray).toHaveBeenCalled();
  });

  test('ejecuta los callbacks de actualización del ScrollTrigger correctamente', () => {
    render(<SelectedWork />);

    // Obtener la llamada de ScrollTrigger.create
    const scrollTriggerCalls = (ScrollTrigger.create as jest.Mock).mock.calls;
    const lastCallConfig = scrollTriggerCalls[scrollTriggerCalls.length - 1][0];

    expect(typeof lastCallConfig.onUpdate).toBe('function');

    // Simular evento de ScrollTrigger avanzando
    act(() => {
      lastCallConfig.onUpdate({ progress: 0.5 });
    });

    // El indicador de scroll debe recibir la clase opacity-0 tras desplazarse
    const scrollHint = screen.getByText(/\[ Haz scroll para explorar \]/i);
    expect(scrollHint).toHaveClass('opacity-0');
  });
});