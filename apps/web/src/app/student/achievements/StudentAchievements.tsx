import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Flame, TrendingUp, Zap, BookOpen, Target, Clock, CheckCircle, Trophy } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { useAuthStore } from '../../../stores/authStore';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  earnedDate: string | null;
  progress?: number;
  maxProgress?: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first assignment', icon: <CheckCircle className="w-6 h-6" />, color: 'text-emerald-600', bgColor: 'bg-emerald-100', earnedDate: 'Jan 15, 2026' },
  { id: 'a2', title: 'Hot Streak', description: 'Submit assignments on time for 7 days straight', icon: <Flame className="w-6 h-6" />, color: 'text-orange-600', bgColor: 'bg-orange-100', earnedDate: 'Feb 3, 2026' },
  { id: 'a3', title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: <Zap className="w-6 h-6" />, color: 'text-amber-600', bgColor: 'bg-amber-100', earnedDate: 'Mar 10, 2026' },
  { id: 'a4', title: 'Bookworm', description: 'Complete 10 reading assignments', icon: <BookOpen className="w-6 h-6" />, color: 'text-blue-600', bgColor: 'bg-blue-100', earnedDate: 'Mar 22, 2026' },
  { id: 'a5', title: 'Perfect Score', description: 'Get 100% on any assignment', icon: <Star className="w-6 h-6" />, color: 'text-yellow-600', bgColor: 'bg-yellow-100', earnedDate: 'Apr 2, 2026' },
  { id: 'a6', title: 'Rising Star', description: 'Improve your GPA by 0.3 points', icon: <TrendingUp className="w-6 h-6" />, color: 'text-violet-600', bgColor: 'bg-violet-100', earnedDate: 'Apr 8, 2026' },
  { id: 'a7', title: 'Team Player', description: 'Participate in 3 group projects', icon: <Target className="w-6 h-6" />, color: 'text-pink-600', bgColor: 'bg-pink-100', earnedDate: 'Apr 12, 2026' },
  { id: 'a8', title: 'Early Bird', description: 'Submit 5 assignments before the deadline', icon: <Clock className="w-6 h-6" />, color: 'text-teal-600', bgColor: 'bg-teal-100', earnedDate: 'Apr 15, 2026' },
  // Locked ones
  { id: 'a9', title: 'Dean\'s List', description: 'Maintain a 3.8+ GPA for a full semester', icon: <Trophy className="w-6 h-6" />, color: 'text-slate-400', bgColor: 'bg-slate-100', earnedDate: null, progress: 3.72, maxProgress: 3.8 },
  { id: 'a10', title: 'Marathon Runner', description: 'Complete 50 assignments', icon: <Target className="w-6 h-6" />, color: 'text-slate-400', bgColor: 'bg-slate-100', earnedDate: null, progress: 38, maxProgress: 50 },
  { id: 'a11', title: 'AI Scholar', description: 'Ask the AI Tutor 100 questions', icon: <Zap className="w-6 h-6" />, color: 'text-slate-400', bgColor: 'bg-slate-100', earnedDate: null, progress: 24, maxProgress: 100 },
  { id: 'a12', title: 'Legendary', description: 'Earn all other achievements', icon: <Award className="w-6 h-6" />, color: 'text-slate-400', bgColor: 'bg-slate-100', earnedDate: null, progress: 8, maxProgress: 11 },
];

export function StudentAchievements() {
  const { user } = useAuthStore();
  const earned = ACHIEVEMENTS.filter(a => a.earnedDate);
  const locked = ACHIEVEMENTS.filter(a => !a.earnedDate);

  return (
    <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto pb-12 w-full mt-2">

      {/* Header with Level Display */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-300" />
              <span className="text-xs font-semibold uppercase tracking-wide">7-Day Streak</span>
            </div>
            <h1 className="text-3xl font-[800] tracking-tight">Achievements</h1>
            <p className="text-white/70 mt-1">Keep learning, keep earning! You've unlocked <strong className="text-white">{earned.length}</strong> of {ACHIEVEMENTS.length} badges.</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Level indicator */}
            <div className="text-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="6"
                    strokeDasharray={`${(earned.length / ACHIEVEMENTS.length) * 220} 220`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-[800]">8</span>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-1 font-semibold">Level</p>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-4xl font-[800]">{earned.length}/{ACHIEVEMENTS.length}</p>
              <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Earned Badges ({earned.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {earned.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200">
                <div className={`w-14 h-14 ${ach.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 ${ach.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  {ach.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{ach.description}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-3 uppercase tracking-wider">{ach.earnedDate}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked / In Progress */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-slate-400" /> In Progress ({locked.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locked.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-center gap-4 border-slate-200 opacity-80 hover:opacity-100 transition-opacity">
                <div className={`w-12 h-12 ${ach.bgColor} rounded-xl flex items-center justify-center ${ach.color} shrink-0`}>
                  {ach.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-700">{ach.title}</h3>
                    <Badge variant="slate">Locked</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{ach.description}</p>
                  {ach.progress !== undefined && ach.maxProgress !== undefined && (
                    <div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((ach.progress / ach.maxProgress) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{ach.progress} / {ach.maxProgress}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
