import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../../stores/authStore';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { User, Mail, Shield, Bell, Key, Eye, EyeOff, CheckCircle, Lock, Smartphone, Globe, Moon, Volume2 } from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'notifications';

export function GlobalSettings() {
  const { user, role } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saved, setSaved] = useState(false);

  // Security tab state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // Notification preferences state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [messageNotifs, setMessageNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'My Profile', icon: <User className="w-5 h-5" /> },
    { id: 'security' as SettingsTab, label: 'Security & Password', icon: <Shield className="w-5 h-5" /> },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  ];

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? 'bg-blue' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto pb-12 w-full mt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal profile and preferences.</p>
        </div>
        {/* Save feedback toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-semibold shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Changes saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left navigation sidebar for settings */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right side - Tab Content */}
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence mode="wait">

            {/* ============ PROFILE TAB ============ */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{user?.name}</h3>
                      <p className="text-sm text-slate-500 mb-3 capitalize">{role} Account</p>
                      <div className="flex gap-2">
                        <Button variant="secondary" className="h-8 px-3 text-xs border-slate-200">Upload Photo</Button>
                        <Button variant="ghost" className="h-8 px-3 text-xs text-red-500 hover:bg-red-50 hover:text-red-600">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input type="text" defaultValue={user?.name} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input type="email" defaultValue={`${user?.name?.toLowerCase().replace(' ', '.')}@cpehs.edu`} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role / Title</label>
                        <input type="text" disabled defaultValue={role ? role.charAt(0).toUpperCase() + role.slice(1) : ''} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500 outline-none cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                        <input type="text" defaultValue={role === 'teacher' ? 'Computer Science' : role === 'admin' ? 'Administration' : 'Student Body'} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bio</label>
                      <textarea rows={3} defaultValue="Passionate educator dedicated to nurturing the next generation of STEM leaders." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all resize-none" />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ============ SECURITY TAB ============ */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-slate-400" />
                    Change Password
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">Update your password to keep your account secure.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary" onClick={handleSave}>Update Password</Button>
                    </div>
                  </div>
                </Card>

                <Card className="border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Add an extra layer of security to your account with 2FA.</p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={twoFactor} onChange={setTwoFactor} />
                  </div>
                  {twoFactor && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      Two-Factor Authentication is now enabled. You'll be asked for a verification code on each login.
                    </motion.div>
                  )}
                </Card>

                <Card className="border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">Active Sessions</h3>
                      <p className="text-sm text-slate-500 mt-0.5 mb-4">Manage your logged-in devices.</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Chrome on Windows</p>
                            <p className="text-xs text-slate-500">Current session • Last active now</p>
                          </div>
                          <Badge variant="green">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Safari on iPhone</p>
                            <p className="text-xs text-slate-500">Last active 2 hours ago</p>
                          </div>
                          <Button variant="ghost" className="text-red-500 h-8 px-3 text-xs hover:bg-red-50">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ============ NOTIFICATIONS TAB ============ */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-400" />
                    Notification Channels
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">Choose how you'd like to receive alerts.</p>
                  
                  <div className="space-y-5 divide-y divide-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Mail className="w-4 h-4" /></div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Email Notifications</p>
                          <p className="text-xs text-slate-500">Receive alerts via email</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={emailNotifs} onChange={setEmailNotifs} />
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Volume2 className="w-4 h-4" /></div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Push Notifications</p>
                          <p className="text-xs text-slate-500">Browser and mobile alerts</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={pushNotifs} onChange={setPushNotifs} />
                    </div>
                  </div>
                </Card>

                <Card className="border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">Alert Preferences</h2>
                  <p className="text-sm text-slate-500 mb-6">Fine-tune which events trigger notifications.</p>
                  
                  <div className="space-y-5 divide-y divide-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Grade Updates</p>
                        <p className="text-xs text-slate-500">When a student's grade is submitted or updated</p>
                      </div>
                      <ToggleSwitch enabled={gradeAlerts} onChange={setGradeAlerts} />
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Attendance Flags</p>
                        <p className="text-xs text-slate-500">When a student is marked absent or tardy</p>
                      </div>
                      <ToggleSwitch enabled={attendanceAlerts} onChange={setAttendanceAlerts} />
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">New Messages</p>
                        <p className="text-xs text-slate-500">When you receive a new message from a student or parent</p>
                      </div>
                      <ToggleSwitch enabled={messageNotifs} onChange={setMessageNotifs} />
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Weekly Digest</p>
                        <p className="text-xs text-slate-500">A weekly summary of key metrics and activity</p>
                      </div>
                      <ToggleSwitch enabled={weeklyDigest} onChange={setWeeklyDigest} />
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="secondary">Reset Defaults</Button>
                    <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
