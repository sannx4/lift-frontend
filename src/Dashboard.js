import React, { useEffect, useState } from 'react';
import BodyCompositionChart from './components/BodyCompositionChart';
import DailyMotivation from './components/DailyMotivation';
import WaterIntakeTracker from './components/WaterTracker';
import CelebrationOverlay from './components/CelebrationOverlay';
import FocusTimer from './components/FocusTimer';
import MacroTracker from './components/MacroTracker';
import MacroPieChart from './components/MacroPieChart';
const API_BASE_URL = process.env.REACT_APP_API_URL;


function Dashboard() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [compositionResult, setCompositionResult] = useState(null);
  const [mlHeight, setMlHeight] = useState('');
  const [mlWeight, setMlWeight] = useState('');
  const [entries, setEntries] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [macroTotals, setMacroTotals] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [calories, setCalories] = useState('');
  const [steps, setSteps] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const token = localStorage.getItem('token');

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/fitness`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchEntries();
    }
  }, [token,fetchEntries]);

  const handleAddOrUpdateEntry = async (e) => {
    e.preventDefault();
    try {
      const entryData = { weight, calories, steps, date };
      let res;
      if (editingId) {
        res = await fetch(`${API_BASE_URL}/api/fitness/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify(entryData),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/fitness`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify(entryData),
        });
      }
      if (res.ok) {
        setMessage(editingId ? 'Entry updated!' : 'Entry added!');
        setWeight('');
        setCalories('');
        setSteps('');
        setDate('');
        setEditingId(null);
        fetchEntries();
      } else {
        setMessage('Error submitting entry.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting entry.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/fitness/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      fetchEntries();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  setMacroTotals({ protein: 0, carbs: 0, fat: 0 });
}, []);

  const handleEdit = (entry) => {
    setWeight(entry.weight);
    setCalories(entry.calories);
    setSteps(entry.steps);
    setDate(entry.date.split('T')[0]);
    setEditingId(entry._id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleBodyComposition = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://lift-mlmodel.onrender.com/predict', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender,
          age,
          height: mlHeight,
          weight: mlWeight,
          waist,
          neck,
          hip
        })
      });
      const data = await res.json();
      console.log("ML Response:", data);
      setCompositionResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6 relative">

      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center text-8xl z-50 pointer-events-none">
          🎉
        </div>
      )}

      {/* ➡️ Right Sidebar */}
      <div className="fixed right-8 top-24 z-40 flex flex-col gap-4">
        <DailyMotivation />
        <WaterIntakeTracker waterIntake={waterIntake} setWaterIntake={setWaterIntake} onFull={() => setShowCelebration(true)} />
        <FocusTimer />
      </div>

      {/* ➡️ Left Sidebar */}
      <div className="fixed left-6 top-10 z-40 flex flex-col gap-4">
        <MacroTracker setMacroTotals={setMacroTotals} />
        <MacroPieChart
          protein={macroTotals.protein}
          carbs={macroTotals.carbs}
          fat={macroTotals.fat}
        />
      </div>

      {/* ➡️ Main Dashboard */}
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700">My Fitness Dashboard</h2>
          <button onClick={handleLogout} className="shine-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
        </div>

        {/* Fitness Entry Form */}
        <form onSubmit={handleAddOrUpdateEntry} className="flex flex-col gap-3">
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Steps" value={steps} onChange={(e) => setSteps(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="border rounded px-3 py-2" />
          <button type="submit" className="shine-button bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{editingId ? 'Update Entry' : 'Add Entry'}</button>
        </form>
        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </div>

      {/* Body Composition Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md mt-6">
        <form onSubmit={handleBodyComposition} className="flex flex-col gap-2">
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded px-3 py-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Height (cm)" value={mlHeight} onChange={(e) => setMlHeight(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Weight (kg)" value={mlWeight} onChange={(e) => setMlWeight(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Waist (cm)" value={waist} onChange={(e) => setWaist(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="number" placeholder="Neck (cm)" value={neck} onChange={(e) => setNeck(e.target.value)} required className="border rounded px-3 py-2" />
          {gender === 'female' && (
            <input type="number" placeholder="Hip (cm)" value={hip} onChange={(e) => setHip(e.target.value)} required className="border rounded px-3 py-2" />
          )}
          <button type="submit" className="shine-button bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Calculate Composition</button>
        </form>
        {compositionResult && (
          <BodyCompositionChart
            bodyFatPercentage={compositionResult.bodyFatPercentage}
            leanMassPercentage={compositionResult.leanMassPercentage}
            waterPercentage={compositionResult.waterPercentage}
          />
        )}
      </div>

      {/* Fitness Entries List */}
      <div className="w-full max-w-lg mt-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Your Fitness Entries</h3>
        {Array.isArray(entries) && entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry._id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="text-gray-700">
                  <strong>{new Date(entry.date).toLocaleDateString()}</strong> | {entry.weight} kg | {entry.calories} cal | {entry.steps} steps
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleEdit(entry)} className="shine-button bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
                  <button onClick={() => handleDelete(entry._id)} className="shine-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No entries yet.</p>
        )}
      </div>

      {/* Celebration */}
      <CelebrationOverlay show={showCelebration} onClose={() => setShowCelebration(false)} />

    </div>
  );
}

export default Dashboard;
