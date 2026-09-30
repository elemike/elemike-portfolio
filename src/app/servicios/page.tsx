export default function Servicios() {
  return (
    <div>
      {/* INTRO */}
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-4 md:px-10">
        <h1 className="text-3xl font-bold md:text-4xl">Servicios</h1>
        <p className="mt-3 max-w-xl text-ink/70">
          Dos líneas de trabajo, un mismo objetivo: automatizar lo que le
          quita tiempo a las personas.
        </p>
      </div>

      {/* AUTOMATIZACIÓN DE NEGOCIOS */}
      <section id="agrotech" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
          <span className="h-1 w-10 bg-amber block" />
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">
            Automatización de negocios
          </h2>
          <p className="mt-3 max-w-xl text-ink/70">
            Bots de atención al cliente, agendamiento de citas y gestión
            documental para negocios que quieren dejar de perder tiempo
            en tareas repetitivas.
          </p>

          {/* Case studies */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border border-line p-6">
              <p className="font-mono text-xs text-amber">Clínica odontológica</p>
              <h3 className="mt-2 font-medium">Bot de atención al paciente</h3>
              <p className="mt-2 text-sm text-ink/70">
                Automatización de consultas frecuentes y agendamiento
                inicial, reduciendo la carga del equipo de recepción.
              </p>
              <p className="mt-4 text-xs text-ink/40">
                Testimonio — pendiente de agregar
              </p>
            </div>

            <div className="border border-line p-6">
              <p className="font-mono text-xs text-amber">Repuestos de carros</p>
              <h3 className="mt-2 font-medium">Bot de consultas y disponibilidad</h3>
              <p className="mt-2 text-sm text-ink/70">
                Respuestas automáticas sobre productos y disponibilidad,
                sin intervención humana constante.
              </p>
              <p className="mt-4 text-xs text-ink/40">
                Testimonio — pendiente de agregar
              </p>
            </div>

            <div className="border border-line p-6">
              <p className="font-mono text-xs text-amber">Barbería</p>
              <h3 className="mt-2 font-medium">Automatización de citas</h3>
              <p className="mt-2 text-sm text-ink/70">
                Gestión automática de agendamiento, reduciendo conflictos
                de horario y ausencias.
              </p>
              <p className="mt-4 text-xs text-ink/40">
                Testimonio — pendiente de agregar
              </p>
            </div>
          </div>

          <a href="mailto:elemike2004@gmail.com?subject=Quiero automatizar mi negocio"
            className="mt-10 inline-block border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors">
              Cotiza tu automatización
            </a>
        </div>
      </section>

      {/* AGTECH */}
      <section id="agrotech" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
          <span className="h-1 w-10 bg-forest block" />
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">AgTech</h2>
          <p className="mt-3 max-w-xl text-ink/70">
            Monitoreo de cultivos con drones y automatización de
            invernaderos, para que los equipos de campo sepan qué está
            bien, qué está mal, y dónde está la falla, sin recorrer todo
            el cultivo a pie.
          </p>

          <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
            <p>
              Este proyecto está en desarrollo. Cuento con acceso real al
              sector agroindustrial colombiano y experiencia previa
              construyendo herramientas internas para una de las
              exportadoras más grandes del país.
            </p>
            <p className="text-sm text-ink/60">
              Estado actual: buscando un proyecto piloto para validar la
              propuesta con un cliente real.
            </p>
          </div>

            <a href="mailto:elemike2004@gmail.com?subject=Hablemos de mi cultivo"
            className="mt-10 inline-block border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
          >
            Hablemos de tu cultivo
          </a>
          
            
        </div>
      </section>
    </div>
  );
}