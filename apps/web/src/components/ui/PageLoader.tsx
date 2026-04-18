import React from 'react';
import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative">
        <img src="/logo.png" alt="Loading" className="w-16 h-16 rounded-2xl shadow-lg shadow-blue-500/20 animate-pulse" />
        <div className="absolute -inset-2 rounded-3xl border-2 border-blue-200 animate-ping opacity-30" />
      </div>
      <p className="mt-6 text-sm font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-slate-100 rounded" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 w-full mt-2 animate-pulse">
      {/* Banner skeleton */}
      <div className="h-48 rounded-2xl bg-slate-200" />
      
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-2" />
            <div className="h-2 bg-slate-100 rounded w-full" />
          </div>
        ))}
      </div>
      
      {/* Content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
