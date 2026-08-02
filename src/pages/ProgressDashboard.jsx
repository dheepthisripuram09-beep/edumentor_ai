import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Flame, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Circular Progress Component
const CircularProgress = ({ value, label, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90 absolute">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <span className="text-2xl font-bold text-slate-900 dark:text-white absolute">
          {Math.round(value)}%
        </span>
      </div>
      <span className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
};

const ProgressDashboard = () => {
  const [scores] = useLocalStorage('edumentor_quiz_scores', []);
  const [plans] = useLocalStorage('edumentor_study_plans', []);
  
  const [stats, setStats] = useState({
    averageScore: 0,
    quizzesTaken: 0,
    streak: 3, // Mock data for demo
    topicsCovered: 0
  });

  useEffect(() => {
    if (scores.length > 0) {
      const totalPercentage = scores.reduce((acc, curr) => acc + (curr.score / curr.total), 0);
      const uniqueTopics = new Set(scores.map(s => s.topic)).size;
      
      setStats({
        averageScore: (totalPercentage / scores.length) * 100,
        quizzesTaken: scores.length,
        streak: Math.floor(Math.random() * 5) + 1, // Random streak for visual demo
        topicsCovered: uniqueTopics
      });
    }
  }, [scores]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center mb-2">
          <TrendingUp className="mr-3 h-8 w-8 text-primary-500" />
          Progress Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Track your learning journey and view your achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Top Stat Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-xl">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Daily Streak</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.streak} Days</div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Quizzes Taken</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.quizzesTaken}</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Average Score</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(stats.averageScore)}%</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Topics Mastered</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.topicsCovered}</div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Progress Charts */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Performance Overview</h2>
          <div className="flex justify-around">
            <CircularProgress value={stats.averageScore || 0} label="Accuracy" color="text-primary-500" />
            <CircularProgress value={stats.quizzesTaken > 0 ? Math.min(100, stats.quizzesTaken * 10) : 0} label="Consistency" color="text-purple-500" />
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Quizzes</h2>
          
          {scores.length > 0 ? (
            <div className="space-y-4">
              {scores.slice().reverse().slice(0, 4).map((score, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{score.topic}</div>
                    <div className="text-xs text-slate-500">{new Date(score.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary-600 dark:text-primary-400">{score.score}/{score.total}</div>
                    <div className="text-xs text-slate-500">{Math.round((score.score / score.total) * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              No quizzes taken yet. <br/> Go to the Quiz Generator to start!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
