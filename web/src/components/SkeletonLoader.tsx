'use client'

interface SkeletonLoaderProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  className?: string
}

export function SkeletonLoader({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className
}: SkeletonLoaderProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s ease-in-out infinite',
      }}
    >
      <style jsx>{`
        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}

interface SkeletonCardProps {
  lines?: number
}

export function SkeletonCard({ lines = 3 }: SkeletonCardProps) {
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <SkeletonLoader width="60%" height="1.5rem" borderRadius="6px" />
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLoader
            key={i}
            width={i === lines - 1 ? '80%' : '100%'}
            height="1rem"
            borderRadius="4px"
          />
        ))}
      </div>
    </div>
  )
}

