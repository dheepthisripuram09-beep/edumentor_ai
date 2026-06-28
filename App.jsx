import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AIStudyAssistant from './pages/AIStudyAssistant';
import QuizGenerator from './pages/QuizGenerator';
import StudyPlanner from './pages/StudyPlanner';
import ProgressDashboard from './pages/ProgressDashboard';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Add padding top for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<AIStudyAssistant />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/dashboard" element={<ProgressDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
