import React, { useEffect, useState } from 'react';

const quotes = [
  "Your future is created by what you do today, not tomorrow.",
  "Small steps every day lead to big changes.",
  "You are stronger than you think.",
  "Discipline is choosing what you want most over what you want now.",
  "Every day is a new opportunity to improve yourself."
];

function DailyMotivation() {
  const [quote, setQuote] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const storedQuote = localStorage.getItem('dailyQuote');
    const storedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();

    if (storedQuote && storedDate === today) {
      setQuote(storedQuote);
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('quoteDate', today);
    }
  }, []);

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 w-80 sm:w-96 p-4 rounded-lg shadow transition-transform duration-300 ease-in-out ${
        hovered ? 'scale-105 shadow-lg' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="font-semibold text-lg">✨ Daily Motivation</h3>
      <p className="truncate">{quote}</p>

      {hovered && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center p-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
          <p className="text-center text-blue-800 font-medium">{quote}</p>
        </div>
      )}
    </div>
  );
}

export default DailyMotivation;
