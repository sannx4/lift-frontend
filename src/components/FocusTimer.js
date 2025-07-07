import React, { useState, useEffect } from 'react';

function FocusTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
<div className="fixed right-21 bottom-32 w-56 p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-center font-semibold text-gray-800">Focus Timer</h3>
      <p className="text-center text-2xl font-mono mt-2">{formatTime(time)}</p>
      <div className="flex justify-center gap-2 mt-3">
        {!isRunning ? (
          <button onClick={handleStart} className="shine-button bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Start</button>
        ) : (
          <button onClick={handleStop} className="shine-button bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Stop</button>
        )}
        <button onClick={handleReset} className="shine-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reset</button>
      </div>
    </div>
  );
}

export default FocusTimer;
