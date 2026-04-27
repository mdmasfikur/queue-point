"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Users,
  CreditCard,
  Shield,
  Bell,
  Download,
  Camera,
  Save,
  Edit2,
  UserPlus,
  Trash2,
  MoreVertical,
  Plus,
  Lock,
  Copy,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isEditing, setIsEditing] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Form Data
  const [profileData, setProfileData] = React.useState({
    businessName: "City Pharmacy",
    businessEmail: "contact@citypharmacy.com",
    phone: "+1 (555) 123-4567",
    website: "www.citypharmacy.com",
    address: "123 Main Street, Downtown, New York, NY 10001",
    taxId: "12-3456789",
    businessType: "Pharmacy",
    founded: "2015",
    employees: "25-50",
    description:
      "Leading pharmacy serving the community with quality healthcare services.",
  });

  const [users, setUsers] = React.useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@citypharmacy.com",
      role: "Owner",
      avatar: "JD",
      status: "active",
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@citypharmacy.com",
      role: "Manager",
      avatar: "SS",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@citypharmacy.com",
      role: "Staff",
      avatar: "MJ",
      status: "inactive",
      lastActive: "2 days ago",
    },
  ]);

  const [billingInfo, setBillingInfo] = React.useState({
    plan: "Professional",
    price: "$49",
    billingCycle: "monthly",
    nextBilling: "March 15, 2026",
    paymentMethod: "Visa ending in 4242",
    invoices: [
      { id: "INV-001", date: "Feb 15, 2026", amount: "$49", status: "paid" },
      { id: "INV-002", date: "Jan 15, 2026", amount: "$49", status: "paid" },
      { id: "INV-003", date: "Dec 15, 2025", amount: "$49", status: "paid" },
    ],
  });

  const [securitySettings, setSecuritySettings] = React.useState({
    twoFactor: false,
    sessionTimeout: "30",
    ipWhitelist: [] as string[],
    apiKeys: [
      {
        id: "key1",
        name: "Production Key",
        key: "qp_live_xxxxxxxxxxxx",
        created: "Jan 1, 2026",
        lastUsed: "Today",
      },
      {
        id: "key2",
        name: "Development Key",
        key: "qp_test_yyyyyyyyyyyy",
        created: "Jan 15, 2026",
        lastUsed: "Yesterday",
      },
    ],
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailAlerts: true,
    smsAlerts: false,
    queueAlerts: true,
    customerFeedback: true,
    marketingEmails: false,
    weeklyReports: true,
  });

  const tabs = [
    { id: "profile", label: "Business Profile", icon: <Building2 size={18} /> },
    { id: "users", label: "Team Members", icon: <Users size={18} /> },
    { id: "billing", label: "Billing & Plan", icon: <CreditCard size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    setIsEditing(false);
  };

  const handleAddUser = () => {
    // Add user logic
    console.log("Add user");
  };

  const handleGenerateApiKey = () => {
    // Generate API key logic
    console.log("Generate API key");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1215] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-white/40 hover:text-white text-sm flex items-center gap-1 mb-2"
            >
              <ArrowLeft size={14} />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-white/40 mt-1">
              Manage your business profile and preferences
            </p>
          </div>
          {activeTab === "profile" && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
          {activeTab === "profile" && isEditing && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm font-medium hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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
          )}
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-8 border-b border-white/10 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium hidden sm:inline">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Business Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Business Logo */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">CP</span>
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-2 -right-2 p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition">
                        <Camera size={14} className="text-white" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {profileData.businessName}
                    </h3>
                    <p className="text-sm text-white/40">
                      Member since {profileData.founded}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(profileData).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-white/60 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      {isEditing ? (
                        key === "description" ? (
                          <textarea
                            value={value}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                            rows={3}
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                          />
                        )
                      ) : (
                        <p className="text-white mt-1">{value || "—"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {["Monday - Friday", "Saturday", "Sunday"].map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between py-2 border-b border-white/5"
                    >
                      <span className="text-white/70">{day}</span>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <input
                              type="time"
                              defaultValue="09:00"
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                            />
                            <span className="text-white/40">to</span>
                            <input
                              type="time"
                              defaultValue="18:00"
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                            />
                          </>
                        ) : (
                          <span className="text-white">9:00 AM - 6:00 PM</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Members Tab */}
          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Invite User */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Team Members
                    </h3>
                    <p className="text-sm text-white/40">
                      Manage access and permissions
                    </p>
                  </div>
                  <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition"
                  >
                    <UserPlus size={16} />
                    Invite Member
                  </button>
                </div>

                {/* Users List */}
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-white/40">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm text-white/60">
                            {user.role}
                          </div>
                          <div className="text-xs text-white/30">
                            Last active: {user.lastActive}
                          </div>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {user.status}
                        </div>
                        <button className="p-1 hover:bg-white/10 rounded">
                          <MoreVertical size={16} className="text-white/40" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles & Permissions */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Roles & Permissions
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      role: "Owner",
                      permissions: "Full access to all features",
                      users: 1,
                    },
                    {
                      role: "Manager",
                      permissions: "Manage queues, view reports, manage staff",
                      users: 1,
                    },
                    {
                      role: "Staff",
                      permissions: "Serve customers, view queues only",
                      users: 1,
                    },
                  ].map((role) => (
                    <div
                      key={role.role}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div>
                        <div className="font-medium text-white">
                          {role.role}
                        </div>
                        <div className="text-sm text-white/40 mt-1">
                          {role.permissions}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white/60">
                          {role.users} users
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing & Plan Tab */}
          {activeTab === "billing" && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={20} className="text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">
                        Current Plan
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {billingInfo.plan}
                    </h3>
                    <p className="text-white/40 mt-1">
                      {billingInfo.price}/{billingInfo.billingCycle}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition">
                    Upgrade Plan
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      Unlimited
                    </div>
                    <div className="text-xs text-white/40">Queues</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">10,000+</div>
                    <div className="text-xs text-white/40">
                      Monthly customers
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/40">Support</div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Payment Method
                  </h3>
                  <button className="text-emerald-400 text-sm hover:text-emerald-300">
                    Update
                  </button>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <CreditCard size={24} className="text-emerald-400" />
                  <div>
                    <div className="font-medium text-white">
                      {billingInfo.paymentMethod}
                    </div>
                    <div className="text-sm text-white/40">Expires 12/2026</div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Billing History
                  </h3>
                  <button className="text-emerald-400 text-sm flex items-center gap-1 hover:text-emerald-300">
                    <Download size={14} />
                    Export All
                  </button>
                </div>
                <div className="space-y-2">
                  {billingInfo.invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition"
                    >
                      <div>
                        <div className="font-medium text-white">
                          {invoice.id}
                        </div>
                        <div className="text-xs text-white/40">
                          {invoice.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white">{invoice.amount}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            invoice.status === "paid"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {invoice.status}
                        </span>
                        <button className="text-white/40 hover:text-white">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Two-Factor Authentication */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Lock size={20} className="text-emerald-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-white/40">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactor}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactor: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Session Management */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Session Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Current Session</div>
                      <div className="text-sm text-white/40">
                        Chrome on Windows • New York, NY
                      </div>
                    </div>
                    <button className="text-red-400 text-sm hover:text-red-300">
                      Revoke
                    </button>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-sm text-white/60 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: e.target.value,
                        })
                      }
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* API Keys */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      API Keys
                    </h3>
                    <p className="text-sm text-white/40">
                      Manage API access for integrations
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateApiKey}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition"
                  >
                    <Plus size={16} />
                    Generate Key
                  </button>
                </div>
                <div className="space-y-3">
                  {securitySettings.apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div>
                        <div className="font-medium text-white">{key.name}</div>
                        <div className="text-xs text-white/40">
                          Created: {key.created} • Last used: {key.lastUsed}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                          {key.key}
                        </code>
                        <button className="p-1 hover:bg-white/10 rounded">
                          <Copy size={14} className="text-white/40" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  {
                    key: "emailAlerts",
                    label: "Email Alerts",
                    description: "Receive important updates via email",
                  },
                  {
                    key: "smsAlerts",
                    label: "SMS Alerts",
                    description: "Get text messages for urgent notifications",
                  },
                  {
                    key: "queueAlerts",
                    label: "Queue Alerts",
                    description: "Notify when queues are reaching capacity",
                  },
                  {
                    key: "customerFeedback",
                    label: "Customer Feedback",
                    description: "Get notified about new reviews and ratings",
                  },
                  {
                    key: "marketingEmails",
                    label: "Marketing Emails",
                    description: "Product updates and promotional content",
                  },
                  {
                    key: "weeklyReports",
                    label: "Weekly Reports",
                    description: "Receive weekly performance summaries",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between py-3 border-b border-white/5"
                  >
                    <div>
                      <div className="text-white">{setting.label}</div>
                      <div className="text-sm text-white/40">
                        {setting.description}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          notificationSettings[
                            setting.key as keyof typeof notificationSettings
                          ]
                        }
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            [setting.key]: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
