import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileQuestion, CheckCircle2, XCircle, Loader2, Award, RotateCcw } from 'lucide-react';
import { generateQuizQuestions } from '../services/geminiService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);
  
  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Persisted Stats
  const [savedScores, setSavedScores] = useLocalStorage('edumentor_quiz_scores', []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Reset state
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsSubmitted(false);
    
    const questions = await generateQuizQuestions(topic);
    setQuizData({ topic, questions });
    setIsGenerating(false);
  };

  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    
    const currentQuestion = quizData.questions[currentQuestionIdx];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizData.questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Quiz complete
      setShowResults(true);
      const newScoreRecord = {
        topic: quizData.topic,
        score: score + (selectedOption === quizData.questions[currentQuestionIdx].correctAnswer ? 1 : 0),
        total: quizData.questions.length,
        date: new Date().toISOString()
      };
      setSavedScores([...savedScores, newScoreRecord]);
    }
  };

  const resetQuiz = () => {
    setQuizData(null);
    setTopic('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center mb-2">
          <FileQuestion className="mr-3 h-8 w-8 text-primary-500" />
          AI Quiz Generator
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Test your knowledge on any topic with AI-generated MCQs.</p>
      </div>

      {!quizData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 rounded-2xl text-center max-w-2xl mx-auto mt-12"
        >
          <div className="bg-primary-50 dark:bg-primary-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-10 w-10 text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What do you want to test yourself on?</h2>
          <form onSubmit={handleGenerate} className="mt-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. World War 2, JavaScript Promises, Photosynthesis"
              className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-sm dark:text-white mb-6"
              disabled={isGenerating}
              required
            />
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Generating 10 Questions...
                </>
              ) : (
                'Generate Quiz'
              )}
            </button>
          </form>
        </motion.div>
      )}

      {quizData && !showResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-2xl overflow-hidden"
        >
          <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">Topic: {quizData.topic}</h3>
              <div className="text-sm text-slate-500 dark:text-slate-400">Question {currentQuestionIdx + 1} of {quizData.questions.length}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Score</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{score}</div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-medium text-slate-900 dark:text-white mb-8">
              {quizData.questions[currentQuestionIdx].question}
            </h2>
            
            <div className="space-y-4">
              {quizData.questions[currentQuestionIdx].options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === quizData.questions[currentQuestionIdx].correctAnswer;
                
                let optionClasses = "w-full text-left p-5 rounded-xl border-2 transition-all flex justify-between items-center ";
                
                if (!isSubmitted) {
                  optionClasses += isSelected 
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" 
                    : "border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300";
                } else {
                  if (isCorrect) {
                    optionClasses += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                  } else if (isSelected && !isCorrect) {
                    optionClasses += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                  } else {
                    optionClasses += "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={optionClasses}
                    disabled={isSubmitted}
                  >
                    <span className="font-medium">{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-500" />}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-lg font-semibold transition-colors flex items-center"
                >
                  {currentQuestionIdx < quizData.questions.length - 1 ? 'Next Question' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {showResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-2xl text-center max-w-2xl mx-auto"
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="h-12 w-12 text-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">Topic: {quizData.topic}</p>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 mb-8 inline-block w-full max-w-sm border border-slate-200 dark:border-slate-700">
            <div className="text-6xl font-black text-primary-600 dark:text-primary-400 mb-2">
              {score}<span className="text-3xl text-slate-400">/{quizData.questions.length}</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-medium">
              {Math.round((score / quizData.questions.length) * 100)}% Accuracy
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-8 py-4 glass-panel hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold flex items-center justify-center transition-colors"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Take Another Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizGenerator;
