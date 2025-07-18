export const Spinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="24"
    height="24"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "transparent",
    }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <circle
        strokeDasharray="164.93361431346415 56.97787143782138"
        r="35"
        strokeWidth="10"
        stroke="#ffffff"
        fill="none"
        cy="50"
        cx="50"
      >
        <animateTransform
          keyTimes="0;1"
          values="0 50 50;360 50 50"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        ></animateTransform>
      </circle>
      <g></g>
    </g>
  </svg>
);

export const Lightning = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export const Refresh = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);
