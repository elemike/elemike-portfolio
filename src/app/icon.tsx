// src/app/icon.tsx
import { ImageResponse } from 'next/og';

// Dimensiones estándar para el favicon
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pantalla (Fondo #0A1128 con borde redondeado) */}
          <rect
            x="3"
            y="4"
            width="18"
            height="12"
            rx="2"
            fill="#0A1128"
            stroke="#0A1128"
            strokeWidth="1.5"
          />
          {/* Brillo/Línea de código dentro de la pantalla */}
          <path
            d="M7 8L9.5 10L7 12M11.5 12H16.5"
            stroke="#FFF8EB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Base de la Laptop (Color beige #FFF8EB con borde #0A1128) */}
          <path
            d="M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18V18.5C22 19.3284 21.3284 20 20.5 20H3.5C2.67157 20 2 19.3284 2 18.5V18Z"
            fill="#FFF8EB"
            stroke="#0A1128"
            strokeWidth="1.5"
          />
          {/* Muestra para abrir la tapa */}
          <path
            d="M10 17H14"
            stroke="#0A1128"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}