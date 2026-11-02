import React from "react";

const UsFlag = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 190 100"
    className={className}
    role="img"
    aria-label="Bandeira dos Estados Unidos"
  >
    <rect width="190" height="100" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map((i) => (
      <rect key={i} y={(i * 100) / 13} width="190" height={100 / 13} fill="#FFFFFF" />
    ))}
    <rect width="76" height={(7 * 100) / 13} fill="#3C3B6E" />
    {Array.from({ length: 9 }).flatMap((_, row) =>
      Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={(row % 2 === 0 ? 6.3 : 12.6) + col * 12.6}
          cy={5.4 + row * 5.4}
          r="1.9"
          fill="#FFFFFF"
        />
      ))
    )}
  </svg>
);

export default UsFlag;
