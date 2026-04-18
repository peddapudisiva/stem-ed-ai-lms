import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, DollarSign, CheckCircle, Clock, AlertTriangle, Download, Receipt, Calendar, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface FeeItem {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  category: string;
}

const FEES: FeeItem[] = [
  { id: 'f1', description: 'Tuition Fee - Spring 2026', amount: 4500, dueDate: 'Jan 15, 2026', status: 'Paid', paidDate: 'Jan 12, 2026', category: 'Tuition' },
  { id: 'f2', description: 'Lab Fee - AP Physics', amount: 150, dueDate: 'Feb 1, 2026', status: 'Paid', paidDate: 'Jan 28, 2026', category: 'Lab' },
  { id: 'f3', description: 'Technology Fee - Spring 2026', amount: 200, dueDate: 'Feb 15, 2026', status: 'Paid', paidDate: 'Feb 14, 2026', category: 'Technology' },
  { id: 'f4', description: 'Activity Fee - Sports & Clubs', amount: 350, dueDate: 'Mar 1, 2026', status: 'Paid', paidDate: 'Feb 28, 2026', category: 'Activities' },
  { id: 'f5', description: 'Library Fine - Late Return', amount: 12, dueDate: 'Apr 20, 2026', status: 'Pending', category: 'Fine' },
  { id: 'f6', description: 'Field Trip - Science Museum', amount: 45, dueDate: 'Apr 25, 2026', status: 'Pending', category: 'Activities' },
  { id: 'f7', description: 'AP Exam Registration Fee', amount: 97, dueDate: 'Apr 10, 2026', status: 'Overdue', category: 'Exam' },
];

export function ParentFeePayments() {
  const [filter, setFilter] = useState<'all' | 'Paid' | 'Pending' | 'Overdue'>('all');
  const [payModalId, setPayModalId] = useState<string | null>(null);
  const [payToast, setPayToast] = useState(false);
  const [fees, setFees] = useState(FEES);

  const filtered = filter === 'all' ? fees : fees.filter(f => f.status === filter);
  const totalPaid = fees.filter(f => f.status === 'Paid').reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'Pending').reduce((s, f) => s + f.amount, 0);
  const totalOverdue = fees.filter(f => f.status === 'Overdue').reduce((s, f) => s + f.amount, 0);

  const handlePay = (id: string) => {
    setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'Paid' as const, paidDate: 'Today' } : f));
    setPayModalId(null);
    setPayToast(true);
    setTimeout(() => setPayToast(false), 2500);
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto pb-12 w-full mt-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fee Payments</h1>
        <p className="text-slate-500 text-sm mt-1">Manage tuition, activity fees, and other school payments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Total Paid</p>
              <p className="text-2xl font-[800] text-emerald-700">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="border-amber-200 bg-amber-50/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-[800] text-amber-700">${totalPending.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="border-red-200 bg-red-50/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">Overdue</p>
              <p className="text-2xl font-[800] text-red-700">${totalOverdue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {(['all', 'Paid', 'Pending', 'Overdue'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab === 'all' ? 'All' : tab} ({tab === 'all' ? fees.length : fees.filter(f => f.status === tab).length})
          </button>
        ))}
      </div>

      {/* Fee List */}
      <div className="space-y-3">
        {filtered.map((fee, i) => (
          <motion.div
            key={fee.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-0 overflow-hidden border-slate-200">
              <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${
                    fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                    fee.status === 'Overdue' ? 'bg-red-100 text-red-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {fee.status === 'Paid' ? <CheckCircle className="w-5 h-5" /> :
                     fee.status === 'Overdue' ? <AlertTriangle className="w-5 h-5" /> :
                     <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">{fee.description}</h3>
                    <p className="text-xs text-slate-500">
                      {fee.status === 'Paid' ? `Paid on ${fee.paidDate}` : `Due: ${fee.dueDate}`}
                      {' '} • {fee.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-[800] text-slate-900">${fee.amount}</p>
                  <Badge variant={fee.status === 'Paid' ? 'green' : fee.status === 'Overdue' ? 'red' : 'amber'}>
                    {fee.status}
                  </Badge>
                  {fee.status === 'Paid' ? (
                    <Button variant="ghost" className="text-slate-400 hover:text-slate-600 h-9 w-9 p-0">
                      <Receipt className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="primary" className="h-9 px-4 text-sm" onClick={() => setPayModalId(fee.id)}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {payModalId && (() => {
          const fee = fees.find(f => f.id === payModalId)!;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setPayModalId(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Confirm Payment</h2>
                  <button onClick={() => setPayModalId(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-blue" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{fee.description}</h3>
                  <p className="text-4xl font-[800] text-slate-900 my-4">${fee.amount}</p>
                  <p className="text-sm text-slate-500">Payment will be processed via your saved payment method ending in •••• 4242</p>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 rounded-b-2xl">
                  <Button variant="secondary" className="flex-1" onClick={() => setPayModalId(null)}>Cancel</Button>
                  <Button variant="primary" className="flex-1" onClick={() => handlePay(fee.id)}>Confirm & Pay</Button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Toast */}
      {payToast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Payment successful!</span>
        </motion.div>
      )}
    </div>
  );
}
