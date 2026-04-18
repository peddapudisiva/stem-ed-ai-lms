import React from 'react';
import { Users, GraduationCap, AlertCircle, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { KPICard } from '../../../components/charts/KPICard';
import { BarChart } from '../../../components/charts/BarChart';
import { DataTable } from '../../../components/ui/DataTable';
import { DEMO_ANALYTICS } from '../../../data/analytics';
import { DEMO_STUDENTS } from '../../../data/students';

export function AdminDashboard() {
  const atRiskStudents = DEMO_STUDENTS.filter(s => s.atRisk);

  const columns = [
    {
      header: 'Department',
      accessorKey: 'dept',
      cell: (info: any) => <span className="font-[600]">{info.getValue()}</span>
    },
    {
      header: 'Avg Grade',
      accessorKey: 'avgGrade',
      cell: (info: any) => (
        <Badge variant={info.getValue() > 85 ? 'green' : 'amber'}>
          {info.getValue()}%
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      
      {/* Welcome Banner - Premium Redesign */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/10 group">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-blue-600/40 via-purple-600/20 to-transparent rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-1000" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[120%] bg-gradient-to-tl from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-[60px]" />
          {/* Subtle Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] font-medium tracking-wide text-blue-50 uppercase">Live Dashboard</span>
            </div>
            <h1 className="text-[36px] sm:text-[42px] font-[800] mb-3 tracking-tight text-white leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Principal Rivera</span>
            </h1>
            <p className="text-slate-300 text-[16px] leading-relaxed font-light">
              Here is your high-level overview for Coastal Plains High School. You currently have <strong className="text-white font-semibold">3 pending teacher requests</strong> and <strong className="text-red-300 font-semibold">{atRiskStudents.length} students</strong> requiring intervention.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button className="w-full sm:w-auto h-12 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md transition-all rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
              View Detailed Reports
            </Button>
            <Button className="w-full sm:w-auto h-12 px-6 bg-blue hover:bg-blue-dk text-white border-transparent transition-all rounded-xl shadow-blue/20 shadow-lg font-medium">
              Send Announcement
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard 
          title="Total Students"
          value="1,248"
          trend={2.4}
          color="blue"
          icon={<Users className="w-5 h-5" />}
          sparklineData={[1180, 1195, 1210, 1225, 1248]}
        />
        <KPICard 
          title="Average Attendance"
          value={`${DEMO_ANALYTICS.schoolOverall.attendanceRate}%`}
          trend={-0.5}
          color="green"
          icon={<Clock className="w-5 h-5" />}
          sparklineData={[96, 95.5, 94.8, 95, 94.5]}
        />
        <KPICard 
          title="Average GPA"
          value="3.14"
          trend={1.2}
          color="purple"
          icon={<GraduationCap className="w-5 h-5" />}
          sparklineData={[3.01, 3.05, 3.08, 3.12, 3.14]}
        />
        <KPICard 
          title="At-Risk Students"
          value={DEMO_ANALYTICS.schoolOverall.atRiskCount}
          trend={-12}
          color="amber"
          icon={<AlertCircle className="w-5 h-5" />}
          sparklineData={[65, 58, 52, 48, 45]}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Charts */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">Weekly Attendance Trend</h2>
                <p className="text-[13px] text-slate-500 mt-1">Daily aggregated tracking across all grade levels.</p>
              </div>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-full text-[13px] font-[500] pl-4 pr-10 py-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 cursor-pointer shadow-sm transition-all hover:bg-slate-100">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Term</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full h-[320px] -ml-2">
              <BarChart 
                data={DEMO_ANALYTICS.attendanceTrends} 
                xKey="name" 
                series={[{ key: 'value', name: 'Attendance Rate', color: '#3b82f6' }]} 
              />
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="overflow-hidden">
              <h2 className="text-[18px] font-[700] mb-4 text-slate-900 tracking-tight">Department Performance</h2>
              <DataTable 
                data={DEMO_ANALYTICS.departmentPerformance} 
                columns={columns} 
              />
            </Card>
            
            <Card className="bg-gradient-to-br from-slate-50 to-indigo-50/30 border-slate-200">
              <h2 className="text-[18px] font-[700] mb-6 text-slate-900 tracking-tight">Quick Actions</h2>
              <div className="space-y-3">
                <button className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">Manage User Roles</span>
                    <span className="text-[12px] text-slate-500">Update system permissions</span>
                  </div>
                </button>
                
                <button className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-purple-200 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">Review Curriculum</span>
                    <span className="text-[12px] text-slate-500">7 new syllabus updates</span>
                  </div>
                </button>
                
                <button className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-amber-200 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">System Alerts</span>
                    <span className="text-[12px] text-slate-500">Review 2 minor warnings</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Interventions */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="h-full flex flex-col">
             <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h2 className="text-[18px] font-[600]">Needs Intervention</h2>
              <Badge variant="red">{atRiskStudents.length} Students</Badge>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {atRiskStudents.map(student => (
                <div key={student.id} className="flex flex-col gap-2 p-4 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[15px] font-[700] text-slate-900 tracking-tight">{student.firstName} {student.lastName}</h4>
                      <p className="text-[12px] text-slate-500 mt-0.5">Grade {student.gradeLevel} • ID: {student.studentId}</p>
                    </div>
                    <button className="h-8 py-0 px-3 text-[12px] font-[600] rounded-full text-red hover:text-white border border-red-200 hover:bg-red hover:border-red transition-colors">
                      Review
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2 bg-white/60 p-2.5 rounded-lg border border-red-100/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">GPA</span>
                      <span className="text-[14px] font-[700] text-red-dk leading-none">{student.gpa.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Attendance</span>
                      <span className="text-[14px] font-[700] text-red-dk leading-none">{student.attendanceRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="w-full mt-4">
              View All Interventions
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
}
