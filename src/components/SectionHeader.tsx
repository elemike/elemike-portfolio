'use client';

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  tag,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`section-title-header mb-16 flex flex-col items-start gap-3 border-b border-[#001F54]/15 pb-8 ${className}`}
    >
      <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#034078] md:text-sm">
        // {tag}
      </span>
      <h2 className="text-4xl font-black tracking-tight text-[#0A1128] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-base font-normal leading-relaxed text-[#0A1128]/70 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}