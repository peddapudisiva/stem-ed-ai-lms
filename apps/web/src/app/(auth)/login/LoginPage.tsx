import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BookOpen, Users, GraduationCap, Users2, Lock, Mail, ArrowRight } from 'lucide-react';
import { VoidPulse } from '../../../components/ui/VoidPulse';

import { useAuthStore } from '../../../stores/authStore';
import { Button } from '../../../components/ui/Button';
import { Role } from '../../../types/auth';
import { cn } from '../../../utils/cn';
import { useNotificationStore } from '../../../stores/notificationStore';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email('Invalid email format'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { loginDemo } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // For now, regardless of input, we'll log them in as the selected demo role if they pass validation
      await loginDemo(selectedRole);
      addToast({
        title: 'Login successful',
        message: `Welcome back to STEM-ED AI!`,
        type: 'success'
      });
    } catch (error) {
      addToast({
        title: 'Login failed',
        message: 'Invalid credentials provided.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: Role) => {
    setIsLoading(true);
    setSelectedRole(role);
    try {
      await loginDemo(role);
      addToast({ title: 'Success', message: `Signed in as Demo ${role}`, type: 'success' });
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'student', label: 'Student', icon: <GraduationCap className="h-5 w-5" /> },
    { id: 'teacher', label: 'Teacher', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'parent', label: 'Parent', icon: <Users2 className="h-5 w-5" /> },
    { id: 'admin', label: 'Admin', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-surface">
      {/* Left Panel - Void Pulse Motion */}
      <div className="hidden lg:flex w-1/2 bg-[#020617] relative flex-col justify-between overflow-hidden p-12 shadow-[10px_0_60px_rgba(0,0,0,0.5)]">
        
        {/* Canvas-based Void Pulse animation fills the panel */}
        <VoidPulse className="absolute inset-0 w-full h-full z-0" />

        {/* Protective gradients so text is perfectly readable regardless of bright particles */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-[#020617]/80 via-[#020617]/20 to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-20">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="STEM-ED AI Logo" className="w-10 h-10 rounded-xl" />
            <span className="brand text-[28px] font-bold text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">STEM-ED AI</span>
          </div>
          <p className="mt-6 text-slate-200 text-[18px] max-w-md font-[400] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] relative z-20">
            The next-generation learning management system powering Coastal Plains High School.
          </p>
        </div>

        <div className="relative z-20 p-6 rounded-2xl border border-white/10 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://i.pravatar.cc/100?img=47" alt="Avatar" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://i.pravatar.cc/100?img=15" alt="Avatar" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://i.pravatar.cc/100?img=32" alt="Avatar" />
            </div>
            <div className="text-white text-sm font-semibold">Join 1,200+ students</div>
          </div>
          <blockquote className="text-slate-300 text-[15px] italic leading-relaxed">
            "This platform completely transformed how I track my standard mastery and prepare for calculus."
          </blockquote>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">MJ</div>
            <span className="text-white font-semibold text-sm">Marcus Johnson, 10th Grade</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[440px] space-y-8"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-[32px] font-[700] text-slate-900 tracking-tight">Welcome back</h1>
            <p className="mt-2 text-[15px] text-slate-500">Sign in to your account to continue</p>
          </div>

          <div className="space-y-6">
            {/* Role selector */}
            <div className="grid grid-cols-4 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id as Role)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200",
                    selectedRole === r.id 
                      ? "border-blue bg-blue-50 text-blue shadow-sm" 
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  {r.icon}
                  <span className="text-[12px] font-[500] mt-2">{r.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[13px] font-[600] text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    {...register('email')}
                    className={cn(
                      "w-full h-11 pl-10 pr-3 rounded-lg border bg-white text-[14px] transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-blue/20",
                      errors.email ? "border-red focus:border-red" : "border-slate-200 focus:border-blue"
                    )}
                    placeholder={`demo-${selectedRole}@cpehs.edu`}
                  />
                </div>
                {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-[600] text-slate-700">Password</label>
                  <a href="#" className="text-[12px] font-[500] text-blue hover:text-blue-dk transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    {...register('password')}
                    type="password"
                    className={cn(
                      "w-full h-11 pl-10 pr-3 rounded-lg border bg-white text-[14px] transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-blue/20",
                      errors.password ? "border-red focus:border-red" : "border-slate-200 focus:border-blue"
                    )}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-[12px] text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <Button type="submit" variant="primary" className="w-full h-11 text-[15px] rounded-lg mt-2" isLoading={isLoading}>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[12px] font-[500]">
                <span className="bg-surface px-2 text-slate-500 uppercase tracking-wider">Fast Demo Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="secondary" className="w-full rounded-lg h-10" onClick={() => handleDemoLogin('student')} disabled={isLoading}>
                Login as Student
              </Button>
              <Button type="button" variant="secondary" className="w-full rounded-lg h-10" onClick={() => handleDemoLogin('teacher')} disabled={isLoading}>
                Login as Teacher
              </Button>
              <Button type="button" variant="secondary" className="w-full rounded-lg h-10" onClick={() => handleDemoLogin('admin')} disabled={isLoading}>
                Login as Admin
              </Button>
              <Button type="button" variant="secondary" className="w-full rounded-lg h-10" onClick={() => handleDemoLogin('parent')} disabled={isLoading}>
                Login as Parent
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
