import React, { useState } from 'react';

function BodyCompositionChart({ bodyFatPercentage, leanMassPercentage, waterPercentage }) {
  const [isHovered, setIsHovered] = useState(false);

  const width = 150;
  const totalHeight = 150;

  const bodyFatHeight = (bodyFatPercentage / 100) * totalHeight;
  const leanMassHeight = (leanMassPercentage / 100) * totalHeight;
  const waterHeight = (waterPercentage / 100) * totalHeight;

  const isHealthy = bodyFatPercentage >= 8 && bodyFatPercentage <= 24;

  return (
    <div className="relative flex flex-col items-center p-4">
      <div
        className={`relative transition-transform transform ${
          isHovered ? 'scale-105 shadow-lg' : ''
        } rounded-xl cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: '150px', height: '150px', position: 'relative' }}
      >
        <svg width={width} height={totalHeight} className="rounded-lg mx-auto my-auto">
          <defs>
            <linearGradient id="glossyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width={width} height={totalHeight} rx="10" fill="url(#glossyGradient)" stroke="#333" strokeWidth="1" />

          {/* Body Fat */}
          <rect
            x="0"
            y={totalHeight - bodyFatHeight}
            width={width}
            height={bodyFatHeight}
            fill="rgba(255, 99, 132, 0.6)"
          />
          {isHovered && (
            <text
              x={width / 2}
              y={totalHeight - bodyFatHeight / 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="12"
              fill="#fff"
              fontWeight="600"
            >
              {bodyFatPercentage}%
            </text>
          )}

          {/* Lean Mass */}
          <rect
            x="0"
            y={totalHeight - bodyFatHeight - leanMassHeight}
            width={width}
            height={leanMassHeight}
            fill="rgba(75, 192, 192, 0.5)"
          />
          {isHovered && (
            <text
              x={width / 2}
              y={totalHeight - bodyFatHeight - leanMassHeight / 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="12"
              fill="#fff"
              fontWeight="600"
            >
              {leanMassPercentage}%
            </text>
          )}

          {/* Water */}
          <rect
            x="0"
            y={totalHeight - bodyFatHeight - leanMassHeight - waterHeight}
            width={width}
            height={waterHeight}
            fill="rgba(54, 162, 235, 0.5)"
          />
          {isHovered && (
            <text
              x={width / 2}
              y={totalHeight - bodyFatHeight - leanMassHeight - waterHeight / 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="12"
              fill="#fff"
              fontWeight="600"
            >
              {waterPercentage}%
            </text>
          )}
        </svg>

        {isHovered && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 bg-white border rounded shadow text-xs font-semibold whitespace-nowrap">
            {isHealthy ? (
              <span className="text-green-600">✅ You're healthy</span>
            ) : (
              <span className="text-red-600">⚠️ You're not healthy</span>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-2 text-xs text-gray-700 font-medium">
        <p>Body Fat: {bodyFatPercentage}%</p>
        <p>Lean Mass: {leanMassPercentage}%</p>
        <p>Water: {waterPercentage}%</p>
      </div>
    </div>
  );
}

export default BodyCompositionChart;
