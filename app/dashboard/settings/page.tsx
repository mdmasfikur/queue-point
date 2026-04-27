"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutGrid,
  Users,
  Clock,
  BarChart3,
  QrCode,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  ChevronRight,
  Save,
  RefreshCw,
  Globe,
  Bell,
  Shield,
  Palette,
  Database,
  Loader2,
  Moon,
  Sun,
  Monitor,
  Download,
  Trash2,
  AlertTriangle,
  Copy,
  Building2} from "lucide-react";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("general");
  const [saving, setSaving] = React.useState(false);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [showApiKey, setShowApiKey] = React.useState(false);

  // Settings state
  const [generalSettings, setGeneralSettings] = React.useState({
    businessName: "City Pharmacy",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    language: "English",
    currency: "USD",
  });

  const [appearanceSettings, setAppearanceSettings] = React.useState({
    theme: "dark",
    accentColor: "emerald",
    compactMode: false,
    animations: true,
    sidebarCollapsed: false,
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    browserNotifications: true,
    queueUpdateAlerts: true,
    customerJoinAlerts: true,
    peakHourAlerts: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const [integrationSettings, setIntegrationSettings] = React.useState({
    webhookUrl: "",
    apiVersion: "v1",
    rateLimit: 1000,
    webhookEvents: ["queue.join", "queue.leave", "queue.serve"],
  });

  const [backupSettings, setBackupSettings] = React.useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: 30,
  });

  const sections = [
    { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "integrations", label: "Integrations", icon: <Globe size={18} /> },
    { id: "backup", label: "Backup & Data", icon: <Database size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
  ];

  const handleSaveSettings = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  const handleResetSettings = async () => {
    setShowResetConfirm(false);
    // Reset to default logic
  };

  const handleExportData = () => {
    const data = {
      general: generalSettings,
      appearance: appearanceSettings,
      notifications: notificationSettings,
      integrations: integrationSettings,
      backup: backupSettings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `queuepoint-settings-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1215] to-[#0a0a0a]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-72 bg-[#0f1215] border-r border-white/10 z-50 transition-transform lg:translate-x-0 flex flex-col ${
        sidebarOpen ? "translate-x-0" : "-translate-x-72"
      }`}>
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Q</span>
            </div>
            <span className="text-lg font-semibold text-white">
              Queue<span className="text-emerald-400">Point</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <LayoutGrid size={18} />, label: "Dashboard", href: "/dashboard" },
            { icon: <Users size={18} />, label: "Queues", href: "/dashboard/queues" },
            { icon: <Clock size={18} />, label: "Live Status", href: "/dashboard/live" },
            { icon: <BarChart3 size={18} />, label: "Analytics", href: "/dashboard/analytics" },
            { icon: <QrCode size={18} />, label: "QR Codes", href: "/dashboard/qrcodes" },
            { icon: <Building2 size={18} />, label: "Account", href: "/dashboard/account" },
            { icon: <SettingsIcon size={18} />, label: "Settings", href: "/dashboard/settings", active: true },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0f1215]/80 backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-white/60 hover:text-white"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Settings</h1>
                  <p className="text-sm text-white/40">Configure your QueuePoint experience</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10 transition"
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Sidebar */}
            <div className="lg:w-64 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {section.icon}
                  <span className="text-sm font-medium">{section.label}</span>
                  <ChevronRight size={14} className="ml-auto opacity-50" />
                </button>
              ))}
            </div>

            {/* Settings Content */}
            <div className="flex-1 space-y-6">
              {/* General Settings */}
              {activeSection === "general" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">General Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={generalSettings.businessName}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, businessName: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Timezone</label>
                          <select
                            value={generalSettings.timezone}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option>America/New_York</option>
                            <option>America/Los_Angeles</option>
                            <option>Europe/London</option>
                            <option>Asia/Tokyo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Date Format</label>
                          <select
                            value={generalSettings.dateFormat}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Language</label>
                          <select
                            value={generalSettings.language}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Currency</label>
                          <select
                            value={generalSettings.currency}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>JPY (¥)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Appearance Settings */}
              {activeSection === "appearance" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Theme</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { id: "dark", label: "Dark", icon: <Moon size={20} /> },
                        { id: "light", label: "Light", icon: <Sun size={20} /> },
                        { id: "system", label: "System", icon: <Monitor size={20} /> },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: theme.id })}
                          className={`p-4 rounded-xl border transition-all ${
                            appearanceSettings.theme === theme.id
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {theme.icon}
                            <span className="text-sm">{theme.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <h2 className="text-lg font-semibold text-white mb-4">Accent Color</h2>
                    <div className="grid grid-cols-6 gap-3 mb-6">
                      {["emerald", "blue", "purple", "pink", "orange", "cyan"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setAppearanceSettings({ ...appearanceSettings, accentColor: color })}
                          className={`h-10 rounded-lg transition-all ${
                            appearanceSettings.accentColor === color
                              ? `bg-${color}-500 ring-2 ring-white scale-110`
                              : `bg-${color}-500/50 hover:scale-105`
                          }`}
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                          <div className="text-white">Compact Mode</div>
                          <div className="text-sm text-white/40">Reduce spacing and padding</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appearanceSettings.compactMode}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, compactMode: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                          <div className="text-white">Animations</div>
                          <div className="text-sm text-white/40">Enable smooth transitions</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appearanceSettings.animations}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, animations: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                      { key: "smsNotifications", label: "SMS Notifications", desc: "Get text message alerts" },
                      { key: "browserNotifications", label: "Browser Notifications", desc: "Show desktop notifications" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                          <div className="text-white">{item.label}</div>
                          <div className="text-sm text-white/40">{item.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-md font-semibold text-white mb-3">Alert Types</h3>
                      {[
                        { key: "queueUpdateAlerts", label: "Queue Updates", desc: "When queue status changes" },
                        { key: "customerJoinAlerts", label: "Customer Joins", desc: "When customers join queue" },
                        { key: "peakHourAlerts", label: "Peak Hours", desc: "High traffic notifications" },
                        { key: "weeklyReports", label: "Weekly Reports", desc: "Performance summaries" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3">
                          <div>
                            <div className="text-white text-sm">{item.label}</div>
                            <div className="text-xs text-white/40">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                              onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations Settings */}
              {activeSection === "integrations" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Webhook URL</label>
                        <input
                          type="url"
                          value={integrationSettings.webhookUrl}
                          onChange={(e) => setIntegrationSettings({ ...integrationSettings, webhookUrl: e.target.value })}
                          placeholder="https://your-server.com/webhook"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">API Version</label>
                          <select
                            value={integrationSettings.apiVersion}
                            onChange={(e) => setIntegrationSettings({ ...integrationSettings, apiVersion: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option>v1</option>
                            <option>v2 (beta)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Rate Limit (req/min)</label>
                          <input
                            type="number"
                            value={integrationSettings.rateLimit}
                            onChange={(e) => setIntegrationSettings({ ...integrationSettings, rateLimit: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* API Keys */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">API Keys</h2>
                      <button className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 hover:bg-emerald-500/20">
                        Generate New Key
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Production Key", key: "qp_live_xxxxxxxxxxxx", created: "Jan 15, 2026" },
                        { name: "Development Key", key: "qp_test_yyyyyyyyyyyy", created: "Jan 20, 2026" },
                      ].map((apiKey, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{apiKey.name}</span>
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-white/10 rounded">
                                <Copy size={14} className="text-white/40" />
                              </button>
                              <button className="p-1 hover:bg-white/10 rounded">
                                <Trash2 size={14} className="text-red-400" />
                              </button>
                            </div>
                          </div>
                          <code className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded">
                            {apiKey.key}
                          </code>
                          <div className="text-xs text-white/30 mt-2">Created: {apiKey.created}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Backup & Data Settings */}
              {activeSection === "backup" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Automatic Backups</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                          <div className="text-white">Auto Backup</div>
                          <div className="text-sm text-white/40">Automatically backup your data</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={backupSettings.autoBackup}
                            onChange={(e) => setBackupSettings({ ...backupSettings, autoBackup: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      {backupSettings.autoBackup && (
                        <>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Backup Frequency</label>
                              <select
                                value={backupSettings.backupFrequency}
                                onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                              >
                                <option>daily</option>
                                <option>weekly</option>
                                <option>monthly</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Backup Time (UTC)</label>
                              <input
                                type="time"
                                value={backupSettings.backupTime}
                                onChange={(e) => setBackupSettings({ ...backupSettings, backupTime: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Retention (days)</label>
                            <input
                              type="number"
                              value={backupSettings.retentionDays}
                              onChange={(e) => setBackupSettings({ ...backupSettings, retentionDays: parseInt(e.target.value) })}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-red-500/20 rounded-2xl p-6 bg-red-500/[0.02]">
                    <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
                    <p className="text-sm text-white/40 mb-4">Irreversible actions</p>
                    <div className="space-y-3">
                      <button
                        onClick={handleExportData}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition"
                      >
                        <div className="text-left">
                          <div className="text-white">Export All Data</div>
                          <div className="text-xs text-white/40">Download a copy of your data</div>
                        </div>
                        <Download size={18} className="text-white/40" />
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-red-500/20 hover:bg-red-500/5 transition"
                      >
                        <div className="text-left">
                          <div className="text-red-400">Reset All Settings</div>
                          <div className="text-xs text-white/40">Restore to default configuration</div>
                        </div>
                        <RefreshCw size={18} className="text-red-400" />
                      </button>
                      <button
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-red-500/20 hover:bg-red-500/5 transition"
                      >
                        <div className="text-left">
                          <div className="text-red-400">Delete Account</div>
                          <div className="text-xs text-white/40">Permanently delete your account</div>
                        </div>
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div>
                        <div className="text-white">Two-Factor Authentication</div>
                        <div className="text-sm text-white/40">Add an extra layer of security</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <label className="block text-sm font-medium text-white/70 mb-2">Session Timeout (minutes)</label>
                      <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none">
                        <option>15</option>
                        <option>30</option>
                        <option>60</option>
                        <option>120</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <label className="block text-sm font-medium text-white/70 mb-2">IP Whitelist</label>
                      <textarea
                        placeholder="Enter IP addresses (one per line)"
                        rows={3}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none placeholder-white/30"
                      />
                      <p className="text-xs text-white/40 mt-2">Leave empty to allow all IPs</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowResetConfirm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#0f1215] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={24} className="text-yellow-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Reset All Settings?</h2>
                <p className="text-white/40 text-sm mb-6">
                  This will restore all settings to their default values. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetSettings}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-400"
                  >
                    Reset Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}