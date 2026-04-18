import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Download, Mail } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { SearchBar } from '../../../components/ui/SearchBar';
import { DataTable } from '../../../components/ui/DataTable';
import { Tabs } from '../../../components/ui/Tabs';
import { Dropdown } from '../../../components/ui/Dropdown';
import { useModal } from '../../../hooks/useModal';
import { Modal } from '../../../components/ui/Modal';
import { DEMO_STUDENTS } from '../../../data/students';

// We'll mock some educators since DEMO_USERS only has 1 teacher and 1 admin
const MOCK_STAFF = [
  { id: 'usr_teacher_001', name: 'Ms. Thompson', email: 'thompson@cpehs.edu', role: 'teacher', dept: 'CS/Math' },
  { id: 'usr_teacher_002', name: 'Mr. Davis', email: 'davis@cpehs.edu', role: 'teacher', dept: 'English' },
  { id: 'usr_teacher_003', name: 'Dr. Roberts', email: 'roberts@cpehs.edu', role: 'teacher', dept: 'Science' },
  { id: 'usr_admin_001', name: 'Principal Rivera', email: 'rivera@cpehs.edu', role: 'admin', dept: 'Administration' },
];

export function AdminUsers() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const studentColumns = [
    {
      header: 'Student',
      accessorKey: 'name',
      cell: (info: any) => {
        const student = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar initials={`${student.firstName} ${student.lastName}`} size="sm" />
            <div className="flex flex-col">
              <span className="font-[600] text-slate-900">{student.firstName} {student.lastName}</span>
              <span className="text-[12px] text-slate-500">{student.email}</span>
            </div>
          </div>
        )
      }
    },
    { header: 'ID', accessorKey: 'studentId' },
    { header: 'Grade', accessorKey: 'gradeLevel' },
    { 
      header: 'At Risk', 
      accessorKey: 'atRisk',
      cell: (info: any) => info.getValue() 
        ? <Badge variant="red">Yes</Badge> 
        : <Badge variant="green">No</Badge>
    },
    {
      id: 'actions',
      cell: () => (
        <Dropdown 
          align="right"
          trigger={<Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>}
          items={[
            { id: 'edit', label: 'Edit Student', onClick: () => {} },
            { id: 'msg', label: 'Message Guardians', icon: <Mail className="h-4 w-4" />, onClick: () => {} },
            { id: 'disable', label: 'Disable Account', danger: true, onClick: () => {} }
          ]}
        />
      )
    }
  ];

  const staffColumns = [
    {
      header: 'Staff Member',
      accessorKey: 'name',
      cell: (info: any) => {
        const staff = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar initials={staff.name} role={staff.role} size="sm" />
            <div className="flex flex-col">
              <span className="font-[600] text-slate-900">{staff.name}</span>
              <span className="text-[12px] text-slate-500">{staff.email}</span>
            </div>
          </div>
        )
      }
    },
    { 
      header: 'Role', 
      accessorKey: 'role',
      cell: (info: any) => <Badge variant={info.getValue() === 'admin' ? 'purple' : 'blue'} className="capitalize">{info.getValue()}</Badge> 
    },
    { header: 'Department', accessorKey: 'dept' },
    {
      id: 'actions',
      cell: () => (
        <Dropdown 
          align="right"
          trigger={<Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>}
          items={[
            { id: 'edit', label: 'Edit Staff', onClick: () => {} },
            { id: 'reset', label: 'Reset Password', onClick: () => {} },
            { id: 'disable', label: 'Disable Account', danger: true, onClick: () => {} }
          ]}
        />
      )
    }
  ];

  const tabs = [
    { id: 'students', label: 'Students', count: DEMO_STUDENTS.length },
    { id: 'staff', label: 'Staff', count: MOCK_STAFF.length },
    { id: 'parents', label: 'Parents / Guardians', count: 1 }
  ];

  const currentData = activeTab === 'students' 
    ? DEMO_STUDENTS.filter(s => `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeTab === 'staff'
      ? MOCK_STAFF.filter((s: any) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 w-full mt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-2">
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-purple-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50/50 border border-purple-100 mb-4 text-purple shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] font-[700] uppercase tracking-wider">Directory</span>
          </div>
          <h1 className="text-[36px] font-[800] tracking-tight text-slate-900 leading-tight">User <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Management</span></h1>
          <p className="text-slate-500 text-[16px] mt-2 max-w-xl">Add, configure, or remove platform accounts across all roles.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="secondary" className="hidden sm:flex gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="primary" className="gap-2" onClick={() => setIsAddUserModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="border-b px-6 pt-2 bg-slate-50/50">
          <Tabs 
            tabs={tabs} 
            activeId={activeTab} 
            onChange={setActiveTab} 
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="w-full sm:w-96">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                onClear={() => setSearchQuery('')} 
                placeholder={`Search ${activeTab}...`} 
              />
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <DataTable 
            data={currentData as any[]} 
            columns={activeTab === 'students' ? studentColumns as any : staffColumns as any} 
          />
        </div>
      </Card>

      <Modal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)} 
        title="Add New User"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsAddUserModalOpen(false)}>Create Account</Button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <p className="text-[14px] text-slate-500 mb-4">You can manually create a user here, or invite them via email.</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-[600] text-slate-700">First Name</label>
                <input type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-[600] text-slate-700">Last Name</label>
                <input type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue text-[14px]" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700">Email Address</label>
              <input type="email" className="w-full h-10 px-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue text-[14px]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700">Role</label>
              <select className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white focus:outline-none focus:border-blue text-[14px]">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent/Guardian</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
