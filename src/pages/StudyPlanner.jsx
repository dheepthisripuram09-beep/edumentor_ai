import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, BookOpen, Plus, Trash2, CalendarCheck } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const StudyPlanner = () => {
  const [examDate, setExamDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [subjects, setSubjects] = useState([{ id: 1, name: '', priority: 'Medium' }]);
  
  const [plans, setPlans] = useLocalStorage('edumentor_study_plans', []);
  const [currentPlan, setCurrentPlan] = useState(null);

  const handleAddSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: '', priority: 'Medium' }]);
  };

  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const generatePlan = (e) => {
    e.preventDefault();
    
    // Simple logic to generate a plan based on days until exam and priority
    const today = new Date();
    const target = new Date(examDate);
    const daysUntil = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 0) {
      alert("Exam date must be in the future!");
      return;
    }

    const validSubjects = subjects.filter(s => s.name.trim() !== '');
    if (validSubjects.length === 0) return;

    // Distribute hours based on priority
    const priorityWeights = { High: 3, Medium: 2, Low: 1 };
    const totalWeight = validSubjects.reduce((sum, sub) => sum + priorityWeights[sub.priority], 0);
    
    const distributedSubjects = validSubjects.map(sub => ({
      ...sub,
      dailyHours: ((priorityWeights[sub.priority] / totalWeight) * hoursPerDay).toFixed(1)
    }));

    const newPlan = {
      id: Date.now(),
      examDate,
      daysUntil,
      hoursPerDay,
      subjects: distributedSubjects,
      createdAt: new Date().toISOString()
    };

    setCurrentPlan(newPlan);
    setPlans([newPlan, ...plans]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center mb-2">
          <CalendarIcon className="mr-3 h-8 w-8 text-primary-500" />
          Study Planner
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Generate a personalized study timetable to ace your exams.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Planner Form */}
        <div className="md:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Create New Plan</h2>
            
            <form onSubmit={generatePlan} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <CalendarCheck className="w-4 h-4 mr-2" /> Target Exam Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Hours available per day
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" /> Subjects to Cover
                </label>
                
                <div className="space-y-3">
                  {subjects.map((subject, index) => (
                    <div key={subject.id} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Subject name"
                        value={subject.name}
                        onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                        className="flex-grow px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white text-sm"
                        required
                      />
                      <select
                        value={subject.priority}
                        onChange={(e) => handleSubjectChange(subject.id, 'priority', e.target.value)}
                        className="w-28 px-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white text-sm"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      {subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subject.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="mt-3 text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center hover:text-primary-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Subject
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-primary-500/30"
              >
                Generate Timetable
              </button>
            </form>
          </motion.div>
        </div>

        {/* Generated Plan View */}
        <div className="md:col-span-7">
          {currentPlan ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 rounded-2xl h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Study Plan</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Based on {currentPlan.hoursPerDay} hours/day for {currentPlan.daysUntil} days.</p>
                </div>
                <div className="text-right bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg border border-primary-100 dark:border-primary-800/50">
                  <div className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Exam In</div>
                  <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">{currentPlan.daysUntil} <span className="text-base font-medium">Days</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Daily Allocation:</h3>
                
                {currentPlan.subjects.map((sub, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        sub.priority === 'High' ? 'bg-red-500' : sub.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{sub.priority} Priority</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900 dark:text-white">{sub.dailyHours} <span className="text-sm font-medium text-slate-500">hrs/day</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 flex items-center mb-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Tips
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-6 list-disc">
                  <li>Take a 5-minute break every 25 minutes (Pomodoro technique).</li>
                  <li>Review high-priority subjects when your energy is highest.</li>
                  <li>Stay hydrated and get 8 hours of sleep.</li>
                </ul>
              </div>

            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center glass-panel p-12 rounded-2xl border-dashed border-2 border-slate-300 dark:border-slate-700 text-center opacity-70">
              <CalendarIcon className="w-16 h-16 text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300">No Plan Generated</h3>
              <p className="text-slate-500 mt-2 max-w-sm">Fill out the form on the left to generate your personalized study timetable.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
