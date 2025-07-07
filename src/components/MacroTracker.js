import React, { useState, useEffect } from 'react';

function MacroTracker({ setMacroTotals }) {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Fetch food items on mount only
  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched foods:', data); // Debug
        setFoods(data);
      })
      .catch((err) => console.error('Error fetching foods:', err));
  }, []);

  // Update totals when selectedFoods changes
  useEffect(() => {
    const totals = selectedFoods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    setTotals(totals);
    setMacroTotals({ protein: totals.protein, carbs: totals.carbs, fat: totals.fat });
  }, [selectedFoods, setMacroTotals]);

  const handleAddFood = (food) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  return (
    <div className="rounded-xl shadow-lg p-4 bg-gradient-to-br from-green-100 to-green-50 border border-green-300 w-80 hover:scale-105 transform transition duration-300 ease-in-out">
      <h2 className="text-lg font-semibold text-green-800 mb-3 flex items-center justify-center">
        🥦 Macro Tracker
      </h2>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {foods.length > 0 ? (
          foods.map((food) => (
            <button
              key={food._id}
              onClick={() => handleAddFood(food)}
              className="w-full text-left bg-green-50 hover:bg-green-100 px-3 py-1 rounded shadow text-green-800 transition"
            >
              {food.name} ({food.servingSize}) - {food.calories} kcal
            </button>
          ))
        ) : (
          <p className="text-center text-green-700">Loading foods...</p>
        )}
      </div>

      <div className="mt-4 p-3 bg-white rounded-lg shadow-inner text-center space-y-1">
        <p className="text-green-700 font-medium">Calories: <span className="font-semibold">{totals.calories} kcal</span></p>
        <p className="text-green-700 font-medium">Protein: <span className="font-semibold">{totals.protein} g</span></p>
        <p className="text-green-700 font-medium">Carbs: <span className="font-semibold">{totals.carbs} g</span></p>
        <p className="text-green-700 font-medium">Fat: <span className="font-semibold">{totals.fat} g</span></p>
      </div>
    </div>
  );
}

export default MacroTracker;
