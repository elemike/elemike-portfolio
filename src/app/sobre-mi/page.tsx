export default function SobreMi() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
      <div className="grid gap-16 md:grid-cols-[280px_1fr]">
        {/* Foto */}
        <div>
          <div className="aspect-square w-full bg-line" />
          <p className="mt-3 text-xs text-ink/50">Foto — pendiente de reemplazar</p>
        </div>

        {/* Contenido */}
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Michael Cruz</h1>
          <p className="mt-2 text-ink/60">Bogotá, Colombia</p>

          <div className="mt-8 max-w-2xl space-y-4 text-ink/80">
            <p>
              Desarrollador full-stack con más de 4 años de experiencia,
              freelance desde 2020. He construido herramientas internas
              para The Elite Flower, uno de los mayores exportadores de
              flores de Colombia, y actualmente estudio Ingeniería de
              Software en el Politécnico Grancolombiano.
            </p>
            <p>
              Me gusta automatizar lo que le quita tiempo a las personas
              — desde el agendamiento de citas de un negocio local hasta
              el monitoreo de cultivos con drones. Ese es el hilo que
              conecta todo lo que construyo.
            </p>
          </div>

          {/* Stack */}
          <div className="mt-12">
            <h2 className="text-sm font-medium text-ink/50">Stack técnico</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">Frontend</dt>
                <dd className="text-sm">Angular 18, Vue.js, React, Next.js, Tailwind CSS</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">Backend</dt>
                <dd className="text-sm">ASP.NET Core (.NET 10), Node.js, C#</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">Mobile</dt>
                <dd className="text-sm">NativeScript</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">Datos</dt>
                <dd className="text-sm">SQL Server, PostgreSQL</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">Arquitectura</dt>
                <dd className="text-sm">Clean Architecture, control de concurrencia, DevOps</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-sm text-ink/50">IA aplicada</dt>
                <dd className="text-sm">Generación de código, chatbots de atención al cliente en producción</dd>
              </div>
            </dl>
          </div>

          {/* Idiomas y disponibilidad */}
          <div className="mt-12 flex flex-col gap-2 text-sm text-ink/70">
            <p>Español (nativo) · Inglés (Full Professional)</p>
            <p>Disponible para roles presenciales, híbridos o remotos</p>
          </div>
        </div>
      </div>
    </div>
  );
}