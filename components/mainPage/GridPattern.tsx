export function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none bg-zinc-100 z-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <pattern id="small-grid" width="32" height="32"
            patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none"
              stroke="rgba(99,102,241,0.06)" strokeWidth="0.5"/>
          </pattern>
          <pattern id="large-grid" width="128" height="128"
            patternUnits="userSpaceOnUse">
            <rect width="128" height="128" fill="url(#small-grid)"/>
            <path d="M 128 0 L 0 0 0 128" fill="none"
              stroke="rgba(99,102,241,0.10)" strokeWidth="0.8"/>
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="var(--background)"
              stopOpacity="0"/>
            <stop offset="100%" stopColor="var(--background)"
              stopOpacity="0.5"/>
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#large-grid)"/>

        {[128,256,384,512,640].map(x =>
          [128,256,384].map(y => (
            <circle key={`${x}-${y}`}
              cx={x} cy={y}
              r={(x + y) % 256 === 0 ? 4 : 2.5}
              fill="rgba(99,102,241,0.25)"/>
          ))
        )}

        <rect width="100%" height="100%" fill="url(#vignette)"/>
      </svg>
    </div>
  );
}