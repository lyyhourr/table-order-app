export default function DinningTableIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path d="M 10 30 L 13 60 L 17 60 L 15 30 Q 12.5 28 10 30" />
        <rect x="13" y="60" width="12" height="4" rx="1" />
        <line
          x1="15"
          y1="64"
          x2="13"
          y2="75"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="23"
          y1="64"
          x2="25"
          y2="75"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>

      <g>
        <path d="M 110 30 L 107 60 L 103 60 L 105 30 Q 107.5 28 110 30" />
        <rect x="95" y="60" width="12" height="4" rx="1" />
        <line
          x1="97"
          y1="64"
          x2="95"
          y2="75"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="105"
          y1="64"
          x2="107"
          y2="75"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>

      <ellipse cx="60" cy="58" rx="25" ry="8" />

      <rect x="56" y="58" width="8" height="20" rx="1" />

      <ellipse cx="60" cy="78" rx="12" ry="4" />
    </svg>
  );
}
