"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  LayoutGrid,
  Users,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  QrCode,
  ChevronDown,
  Plus,
  MoreVertical,
  Activity,
  CheckCircle,
  UserCheck,
  Download,
  RefreshCw,
  Zap,
  Star,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeQueue, setActiveQueue] = React.useState("pharmacy");
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState("today");

  // Mock data
  const stats = {
    today: { served: 156, waiting: 23, avgWait: 4.2, satisfaction: 98 },
    week: { served: 892, waiting: 45, avgWait: 4.5, satisfaction: 96 },
    month: { served: 3421, waiting: 67, avgWait: 4.3, satisfaction: 97 },
  };

  const currentStats = stats[selectedPeriod as keyof typeof stats];

  const queues = [
    {
      id: "pharmacy",
      name: "Pharmacy Counter",
      waiting: 8,
      serving: "A42",
      served: 56,
      avgWait: 3.5,
      status: "active",
    },
    {
      id: "cashier",
      name: "Cashier",
      waiting: 12,
      serving: "B03",
      served: 78,
      avgWait: 5.2,
      status: "active",
    },
    {
      id: "consultation",
      name: "Consultation",
      waiting: 3,
      serving: "C07",
      served: 22,
      avgWait: 8.5,
      status: "active",
    },
  ];

  const recentCustomers = [
    {
      id: "A42",
      name: "John Smith",
      time: "2 min ago",
      status: "serving",
      type: "pickup",
    },
    {
      id: "A41",
      name: "Sarah Johnson",
      time: "5 min ago",
      status: "completed",
      type: "consultation",
    },
    {
      id: "A40",
      name: "Mike Wilson",
      time: "8 min ago",
      status: "completed",
      type: "pickup",
    },
    {
      id: "A39",
      name: "Emily Brown",
      time: "12 min ago",
      status: "waiting",
      type: "consultation",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Queue Alert",
      message: "Pharmacy queue has 8 people waiting",
      time: "2 min ago",
      type: "warning",
      read: false,
    },
    {
      id: 2,
      title: "Customer Feedback",
      message: "Sarah gave 5-star rating",
      time: "15 min ago",
      type: "success",
      read: false,
    },
    {
      id: 3,
      title: "Peak Hour",
      message: "Expecting high traffic in next hour",
      time: "1 hour ago",
      type: "info",
      read: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1215] to-[#0a0a0a]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-[#0f1215] border-r border-white/10 z-50 lg:translate-x-0 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Q</span>
            </div>
            <span className="text-lg font-semibold text-white">
              Queue<span className="text-emerald-400">Point</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            {
              icon: <LayoutGrid size={18} />,
              label: "Dashboard",
              href: "/dashboard",
              active: true,
            },
            {
              icon: <Building2 size={18} />,
              label: "Account",
              href: "/dashboard/account",
            },
            {
              icon: <Users size={18} />,
              label: "Queues",
              href: "/dashboard/queues",
            },
            {
              icon: <Clock size={18} />,
              label: "Live Status",
              href: "/dashboard/live",
            },
            {
              icon: <BarChart3 size={18} />,
              label: "Analytics",
              href: "/dashboard/analytics",
            },
            {
              icon: <QrCode size={18} />,
              label: "QR Codes",
              href: "/dashboard/qrcodes",
            },
            {
              icon: <Settings size={18} />,
              label: "Settings",
              href: "/dashboard/settings",
            },
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

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

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
                <div className="hidden lg:block">
                  <h1 className="text-xl font-semibold text-white">
                    Dashboard
                  </h1>
                  <p className="text-sm text-white/40">Welcome back, John</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                  <Search size={16} className="text-white/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <Bell size={18} className="text-white/60" />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-[#0f1215] border border-white/10 rounded-xl shadow-2xl z-50"
                      >
                        <div className="p-4 border-b border-white/10">
                          <h3 className="font-semibold text-white">
                            Notifications
                          </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 border-b border-white/5 hover:bg-white/5 transition ${!notif.read ? "bg-emerald-500/5" : ""}`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-1 rounded-full ${
                                    notif.type === "warning"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : notif.type === "success"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-blue-500/10 text-blue-400"
                                  }`}
                                >
                                  {notif.type === "warning" ? (
                                    <AlertCircle size={14} />
                                  ) : notif.type === "success" ? (
                                    <CheckCircle size={14} />
                                  ) : (
                                    <Activity size={14} />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">
                                    {notif.title}
                                  </p>
                                  <p className="text-xs text-white/40 mt-1">
                                    {notif.message}
                                  </p>
                                  <p className="text-xs text-white/30 mt-1">
                                    {notif.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-white">John Doe</p>
                      <p className="text-xs text-white/40">Admin</p>
                    </div>
                    <ChevronDown size={16} className="text-white/40" />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#0f1215] border border-white/10 rounded-xl shadow-2xl z-50"
                      >
                        <div className="p-2">
                          {["Account", "Settings", "Billing", "Support"].map(
                            (item) => (
                              <button
                                key={item}
                                className="w-full text-left px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white rounded-lg transition"
                              >
                                <Link
                                  href={`/dashboard/${item.toLowerCase()}`}
                                  className="flex items-center gap-2"
                                >
                                  {item}
                                </Link>
                              </button>
                            ),
                          )}
                          <hr className="my-2 border-white/10" />
                          <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition">
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Time Period Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {["today", "week", "month"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    selectedPeriod === period
                      ? "bg-emerald-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 text-sm flex items-center gap-2">
                <Download size={14} />
                Export
              </button>
              <button className="px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 text-sm flex items-center gap-2">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Customers Served",
                value: currentStats.served,
                icon: <UserCheck size={20} />,
                trend: "+12%",
                color: "emerald",
              },
              {
                label: "Currently Waiting",
                value: currentStats.waiting,
                icon: <Users size={20} />,
                trend: "-5%",
                color: "blue",
              },
              {
                label: "Avg. Wait Time",
                value: `${currentStats.avgWait} min`,
                icon: <Clock size={20} />,
                trend: "-0.3 min",
                color: "purple",
              },
              {
                label: "Satisfaction",
                value: `${currentStats.satisfaction}%`,
                icon: <Star size={20} />,
                trend: "+2%",
                color: "yellow",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}
                  >
                    {stat.icon}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      stat.trend.startsWith("+")
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Queues & Activity Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Queues */}
            <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Active Queues
                  </h2>
                  <p className="text-sm text-white/40">
                    Real-time queue status
                  </p>
                </div>
                <button className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 flex items-center gap-2 hover:bg-emerald-500/20 transition">
                  <Plus size={14} />
                  New Queue
                </button>
              </div>

              <div className="space-y-4">
                {queues.map((queue, i) => (
                  <motion.div
                    key={queue.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeQueue === queue.id
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : "bg-white/[0.02] border-white/10 hover:border-emerald-500/20"
                    }`}
                    onClick={() => setActiveQueue(queue.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          {queue.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-emerald-400">
                            ● Live
                          </span>
                          <span className="text-xs text-white/40">
                            Serving: {queue.serving}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {queue.waiting}
                        </div>
                        <div className="text-xs text-white/40">waiting</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-white/40">
                          Today: {queue.served}
                        </span>
                        <span className="text-white/40">
                          Avg wait: {queue.avgWait} min
                        </span>
                      </div>
                      <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                        Manage
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Recent Activity
                  </h2>
                  <p className="text-sm text-white/40">Last 12 customers</p>
                </div>
                <button className="text-emerald-400 text-sm hover:text-emerald-300">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {recentCustomers.map((customer, i) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          customer.status === "serving"
                            ? "bg-emerald-400 animate-pulse"
                            : customer.status === "completed"
                              ? "bg-blue-400"
                              : "bg-yellow-400"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-white text-sm">
                          {customer.name}
                        </div>
                        <div className="text-xs text-white/40">
                          {customer.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                        {customer.id}
                      </span>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <MoreVertical size={14} className="text-white/40" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-4 p-3 bg-white/5 rounded-xl text-sm text-white/60 hover:bg-white/10 transition">
                Load more
              </button>
            </div>
          </div>

          {/* Quick Actions & Tips */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <QrCode size={18} />,
                    label: "Generate QR Code",
                    action: () => {},
                  },
                  {
                    icon: <Users size={18} />,
                    label: "Add Customer",
                    action: () => {},
                  },
                  {
                    icon: <BarChart3 size={18} />,
                    label: "View Reports",
                    action: () => {},
                  },
                  {
                    icon: <MessageCircle size={18} />,
                    label: "Send Broadcast",
                    action: () => {},
                  },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={action.action}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {action.icon}
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tip of the Day */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Pro Tip</h2>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Use the &quot;Notify All&quot; feature during peak hours to keep
                waiting customers updated about their queue position. This
                reduces abandonment rates by up to 40%!
              </p>
              <button className="mt-4 text-emerald-400 text-sm hover:text-emerald-300 flex items-center gap-1">
                Learn more
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Live QRs */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Your QR Codes
                </h2>
                <p className="text-sm text-white/40">
                  Share these with your customers
                </p>
              </div>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition">
                <Plus size={16} />
                Create New
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Pharmacy", "Cashier", "Consultation", "Pickup"].map(
                (qr, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-white/[0.03] hover:bg-white/5 transition"
                  >
                    <div className="w-24 h-24 mx-auto bg-white rounded-lg flex items-center justify-center mb-3">
                      <QrCode size={48} className="text-black" />
                    </div>
                    <div className="font-medium text-white text-sm">
                      {qr} Queue
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      123 scans today
                    </div>
                    <button className="mt-2 text-emerald-400 text-xs hover:text-emerald-300">
                      Download
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
