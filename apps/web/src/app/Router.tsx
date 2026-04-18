import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PageLoader } from '../components/ui/PageLoader';
import { LoginPage } from './(auth)/login/LoginPage';
import { NotFoundPage } from './NotFoundPage';

// ── Lazy-loaded views (code-split per role) ──

// Admin
const AdminDashboard = lazy(() => import('./admin/dashboard/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = lazy(() => import('./admin/users/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminAnalytics = lazy(() => import('./admin/analytics/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })));

// Teacher
const TeacherDashboard = lazy(() => import('./teacher/dashboard/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const TeacherGradebook = lazy(() => import('./teacher/gradebook/TeacherGradebook').then(m => ({ default: m.TeacherGradebook })));
const TeacherAttendance = lazy(() => import('./teacher/attendance/TeacherAttendance').then(m => ({ default: m.TeacherAttendance })));
const TeacherAssignments = lazy(() => import('./teacher/assignments/TeacherAssignments').then(m => ({ default: m.TeacherAssignments })));

// Student
const StudentDashboard = lazy(() => import('./student/dashboard/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const StudentGrades = lazy(() => import('./student/grades/StudentGrades').then(m => ({ default: m.StudentGrades })));
const StudentAITutor = lazy(() => import('./student/ai-tutor/StudentAITutor').then(m => ({ default: m.StudentAITutor })));
const StudentAchievements = lazy(() => import('./student/achievements/StudentAchievements').then(m => ({ default: m.StudentAchievements })));

// Parent
const ParentDashboard = lazy(() => import('./parent/dashboard/ParentDashboard').then(m => ({ default: m.ParentDashboard })));
const ParentProgressReports = lazy(() => import('./parent/reports/ParentProgressReports').then(m => ({ default: m.ParentProgressReports })));
const ParentFeePayments = lazy(() => import('./parent/fees/ParentFeePayments').then(m => ({ default: m.ParentFeePayments })));
const ParentDirectory = lazy(() => import('./parent/directory/ParentDirectory').then(m => ({ default: m.ParentDirectory })));

// Shared
const GlobalSettings = lazy(() => import('./shared/settings/GlobalSettings').then(m => ({ default: m.GlobalSettings })));
const SharedMessages = lazy(() => import('./shared/messages/SharedMessages').then(m => ({ default: m.SharedMessages })));
const SharedCalendar = lazy(() => import('./shared/calendar/SharedCalendar').then(m => ({ default: m.SharedCalendar })));

// ── Route Guards ──

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

const AuthRedirect = () => {
  const { isAuthenticated, role } = useAuthStore();
  if (isAuthenticated && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  return <Outlet />;
};

// ── Router ──

const router = createBrowserRouter([
  // Auth Layout
  {
    element: <AuthRedirect />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },
  
  // Dashboard Layouts
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="/login" replace /> },
          
          // Admin
          {
            path: 'admin',
            element: <ProtectedRoute allowedRoles={['admin']} />,
            children: [
              { path: 'dashboard', element: <AdminDashboard /> },
              { path: 'users', element: <AdminUsers /> },
              { path: 'analytics', element: <AdminAnalytics /> },
            ]
          },
          
          // Teacher
          {
            path: 'teacher',
            element: <ProtectedRoute allowedRoles={['teacher']} />,
            children: [
              { path: 'dashboard', element: <TeacherDashboard /> },
              { path: 'gradebook', element: <TeacherGradebook /> },
              { path: 'attendance', element: <TeacherAttendance /> },
              { path: 'assignments', element: <TeacherAssignments /> },
            ]
          },

          // Student
          {
            path: 'student',
            element: <ProtectedRoute allowedRoles={['student']} />,
            children: [
              { path: 'dashboard', element: <StudentDashboard /> },
              { path: 'grades', element: <StudentGrades /> },
              { path: 'ai-tutor', element: <StudentAITutor /> },
              { path: 'achievements', element: <StudentAchievements /> },
            ]
          },

          // Parent
          {
            path: 'parent',
            element: <ProtectedRoute allowedRoles={['parent']} />,
            children: [
              { path: 'dashboard', element: <ParentDashboard /> },
              { path: 'reports', element: <ParentProgressReports /> },
              { path: 'fees', element: <ParentFeePayments /> },
              { path: 'directory', element: <ParentDirectory /> },
            ]
          },

          // Shared
          { path: ':role/messages', element: <Suspense fallback={<PageLoader />}><SharedMessages /></Suspense> },
          { path: ':role/calendar', element: <Suspense fallback={<PageLoader />}><SharedCalendar /></Suspense> },
          { path: 'shared/settings', element: <Suspense fallback={<PageLoader />}><GlobalSettings /></Suspense> },
        ]
      }
    ]
  },
  
  // 404
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
