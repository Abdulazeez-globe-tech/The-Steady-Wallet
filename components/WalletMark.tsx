export default function WalletMark({
  className = "w-5 h-5",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="14"
        rx="3"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M6 6V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <circle cx="17" cy="13" r="1.5" fill="#f6f7f2" />
    </svg>
  );
}
