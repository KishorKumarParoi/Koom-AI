// Spinner.tsx
import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;502"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="150.6 100.4;1 250;150.6 100.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Spinner;
