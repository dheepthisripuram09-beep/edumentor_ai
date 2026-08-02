import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, FileQuestion, Calendar, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, to, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel rounded-2xl p-6 glass-panel-hover group cursor-pointer h-full flex flex-col"
  >
    <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-7 w-7 text-primary-500 dark:text-primary-400" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{description}</p>
    <Link to={to} className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 transition-colors mt-auto">
      Try it out <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-blue-300 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Powered by Google Gemini AI</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Your Personal AI <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400 dark:from-primary-400 dark:to-blue-300">
                Study Companion
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed"
            >
              Master any subject with personalized AI explanations, instantly generated quizzes, and smart study plans designed specifically for you.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/assistant" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1">
                Start Learning Now
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold text-lg transition-all">
                Explore Features
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Supercharge Your Study Sessions</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to excel academically in one beautiful, AI-powered platform.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Brain}
              title="AI Study Assistant"
              description="Get instant, tailored explanations for any topic. Choose 'Explain Like I'm 10' for simple concepts or 'Detailed' for deep dives."
              to="/assistant"
              delay={0.1}
            />
            <FeatureCard 
              icon={FileQuestion}
              title="Quiz Generator"
              description="Instantly generate multiple-choice quizzes on any topic to test your knowledge and retain information better."
              to="/quiz"
              delay={0.2}
            />
            <FeatureCard 
              icon={Calendar}
              title="Study Planner"
              description="Create optimized study schedules based on your exam dates, available hours, and subjects."
              to="/planner"
              delay={0.3}
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Progress Dashboard"
              description="Track your learning streak, quiz scores, and completed topics with beautiful visual analytics."
              to="/dashboard"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-200 mb-8 leading-relaxed">
                "EduMentor AI completely changed how I study for finals. The 'Explain Like I'm 10' feature helped me grasp complex physics concepts I was struggling with all semester."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-12 h-12 rounded-full border-2 border-primary-500 bg-white" />
                <div className="text-left">
                  <div className="font-semibold text-slate-900 dark:text-white">Sarah Jenkins</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Computer Science Major</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
