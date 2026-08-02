import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, GraduationCap, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  
  // Using local storage to persist profile data since we don't have a real DB
  const [profileData, setProfileData] = useLocalStorage('edumentor_profile', {
    name: currentUser?.displayName || 'Student',
    college: 'University of Technology',
    course: 'Computer Science',
    goals: 'Pass finals with a GPA of 3.8 and land a summer internship.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-12 rounded-3xl">
          <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Please Login</h2>
          <p className="text-slate-500">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mt-20 -mr-20"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          
          {/* Profile Picture */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-primary-100">
              <img 
                src={currentUser.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800"></div>
          </div>

          {/* Profile Info / Form */}
          <div className="flex-grow w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {isEditing ? 'Edit Profile' : profileData.name}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">{currentUser.email}</p>
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-primary-50 hover:bg-primary-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-full transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">College/University</label>
                  <input 
                    type="text" 
                    value={editForm.college} 
                    onChange={e => setEditForm({...editForm, college: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course/Major</label>
                  <input 
                    type="text" 
                    value={editForm.course} 
                    onChange={e => setEditForm({...editForm, course: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Academic Goals</label>
                  <textarea 
                    value={editForm.goals} 
                    onChange={e => setEditForm({...editForm, goals: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">College</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{profileData.college}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Course</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{profileData.course}</div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start space-x-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 mt-2">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">My Goals</div>
                    <div className="text-slate-800 dark:text-slate-200 leading-relaxed italic">"{profileData.goals}"</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
