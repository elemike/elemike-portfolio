"use client";

import { useState } from "react";

export default function Proyectos() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => setExpanded(null);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
      <h1 className="text-3xl font-bold md:text-4xl">Proyectos</h1>
      <p className="mt-3 max-w-xl text-ink/70">
        Trabajo técnico enfocado en arquitectura, buenas prácticas y
        problemas reales de negocio.
      </p>

      <div className="mt-16 divide-y divide-line border-t border-line">
        {/* DeskHub */}
        <div className="flex flex-col gap-3 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium">DeskHub</h2>
            <p className="mt-2 max-w-lg text-sm text-ink/70">
              Sistema de reservas de espacios de oficina con control de
              concurrencia real y arquitectura limpia de principio a fin.
            </p>
            <p className="mt-3 font-mono text-xs text-ink/50">
              Angular 18 · ASP.NET Core .NET 10 · SQL Server
            </p>
          </div>
          <button
            onClick={() => setExpanded("deskhub")}
            className="shrink-0 text-sm font-medium text-slate hover:underline"
          >
            Ver detalles →
          </button>
        </div>

        {/* Proyecto freelance */}
        <div className="flex flex-col gap-3 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium">Sistema para negocio de alimentos</h2>
            <p className="mt-2 max-w-lg text-sm text-ink/70">
              Proyecto freelance para cliente real: interfaz de pedidos y
              gestión, optimizada para uso móvil.
            </p>
            <p className="mt-3 font-mono text-xs text-ink/50">
              Next.js · Tailwind CSS · PostgreSQL
            </p>
          </div>
        </div>

        {/* Elite Flower */}
        <div className="flex flex-col gap-3 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium">Herramientas internas — The Elite Flower</h2>
            <p className="mt-2 max-w-lg text-sm text-ink/70">
              Sistema de inventario y plataforma de reserva de puestos,
              usados a diario por múltiples equipos. Código propietario,
              no disponible públicamente.
            </p>
            <p className="mt-3 font-mono text-xs text-ink/50">
              Vue.js · NativeScript
            </p>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ${
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* PANEL LATERAL */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={expanded === null}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-paper shadow-2xl transition-transform duration-300 ease-out ${
          expanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-8 py-10 md:px-10">
          <button
            onClick={close}
            className="text-sm font-medium text-ink/60 hover:text-ink"
          >
            ← Cerrar
          </button>

          <p className="mt-8 font-mono text-xs text-slate">
            Angular 18 · ASP.NET Core .NET 10 · SQL Server
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">DeskHub</h2>
          <p className="mt-4 text-ink/70">
            Sistema de reservas de espacios de oficina construido de
            punta a punta, con foco en arquitectura y control de
            concurrencia real.
          </p>

          <div className="mt-8 flex gap-4">
            <a href="#" className="border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper transition-colors">
              Ver demo
            </a>
            <a href="#" className="border border-line px-5 py-2.5 text-sm font-medium text-ink/70 hover:border-ink hover:text-ink transition-colors">
              Ver repositorio
            </a>
          </div>

          <div className="mt-12 space-y-8 border-t border-line pt-8 text-ink/80">
            <section>
              <h3 className="text-base font-medium text-ink">El problema</h3>
              <p className="mt-2 text-sm">
                Los sistemas de reserva de espacios suelen fallar cuando
                dos personas intentan reservar el mismo puesto al mismo
                tiempo. DeskHub resuelve esto a nivel de base de datos,
                no solo en el frontend.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-ink">Concurrencia</h3>
              <p className="mt-2 text-sm">
                Usé <code className="font-mono">UPDLOCK/HOLDLOCK</code> en
                SQL Server para bloquear la fila correspondiente durante
                la transacción de reserva, evitando condiciones de
                carrera sin sacrificar rendimiento en el resto del sistema.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-ink">Auditoría</h3>
              <p className="mt-2 text-sm">
                Diseñé un sistema de trazabilidad inspirado en el Event
                Viewer de Windows, que registra cada cambio sobre una
                reserva para poder auditar el historial completo.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-ink">Arquitectura</h3>
              <p className="mt-2 text-sm">
                Clean Architecture de principio a fin, separando reglas
                de negocio de infraestructura. Backend con pruebas
                end-to-end y documentación OpenAPI generada nativamente
                desde .NET 10.
              </p>
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
}