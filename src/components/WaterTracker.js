import React, { useState } from 'react';

function WaterIntakeTracker() {
  const [waterIntake, setWaterIntake] = useState(0);
  const dailyGoal = 2500;
  const percentage = Math.min((waterIntake / dailyGoal) * 100, 100).toFixed(0);

  const addGlass = () => {
    setWaterIntake(prev => prev + 250);
  };

  const resetIntake = () => {
    setWaterIntake(0);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-400 to-blue-500 text-white p-4 rounded-2xl shadow-xl w-64 transition-transform duration-300 transform hover:scale-105 group overflow-hidden">
      {/* Celebration Emoji Overlay */}
      {percentage >= 100 && (
        <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-0 animate-fadeIn pointer-events-none">
          🎉
        </div>
      )}

      <h3 className="text-lg font-semibold">💧 Water Intake Tracker</h3>
      <p className="text-sm">{waterIntake} ml of {dailyGoal} ml</p>

      <div className="relative w-full h-4 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full bg-blue-200 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-4 space-x-2">
        <button
          onClick={addGlass}
          className="flex-1 bg-white/20 hover:bg-white/30 text-sm py-1 rounded-lg transition"
        >
          + Add Glass (250ml)
        </button>
        <button
          onClick={resetIntake}
          className="flex-1 bg-white/20 hover:bg-red-400 text-sm py-1 rounded-lg transition"
        >
          Reset
        </button>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-blue-900/70 rounded-2xl flex items-center justify-center text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {percentage}%
      </div>
    </div>
  );
}

export default WaterIntakeTracker;
