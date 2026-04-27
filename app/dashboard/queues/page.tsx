"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Pause,
  Play,
  Settings,
  Users,
  Clock,
  QrCode,
  XCircle,
  Download,
  RefreshCw,
  LayoutGrid,
  BarChart3,
  Menu,
  LogOut,
  UserCheck,
  Activity,
  Copy as CopyIcon,
  Check,
} from "lucide-react";

export default function QueuesPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedQueue, setSelectedQueue] = React.useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Mock queues data
  const [queues, setQueues] = React.useState([
    {
      id: "queue_001",
      name: "Pharmacy Counter",
      location: "Main Floor",
      status: "active",
      waiting: 8,
      served: 156,
      avgWait: 3.5,
      estimatedTime: "5-7 min",
      currentServing: "A42",
      qrCode: "qr_pharmacy_001",
      createdAt: "2024-01-15",
      type: "in-person",
      staff: ["John Doe", "Sarah Smith"],
      settings: {
        maxCapacity: 50,
        autoNotify: true,
        estimatedWaitEnabled: true,
      },
    },
    {
      id: "queue_002",
      name: "Cashier Counter",
      location: "Main Floor",
      status: "active",
      waiting: 12,
      served: 234,
      avgWait: 5.2,
      estimatedTime: "8-10 min",
      currentServing: "B03",
      qrCode: "qr_cashier_002",
      createdAt: "2024-01-15",
      type: "in-person",
      staff: ["Mike Johnson", "Emily Brown"],
      settings: {
        maxCapacity: 30,
        autoNotify: true,
        estimatedWaitEnabled: true,
      },
    },
    {
      id: "queue_003",
      name: "Consultation Room",
      location: "2nd Floor",
      status: "active",
      waiting: 3,
      served: 89,
      avgWait: 8.5,
      estimatedTime: "15-20 min",
      currentServing: "C07",
      qrCode: "qr_consultation_003",
      createdAt: "2024-01-20",
      type: "appointment",
      staff: ["Dr. Wilson", "Nurse Davis"],
      settings: {
        maxCapacity: 20,
        autoNotify: true,
        estimatedWaitEnabled: true,
      },
    },
    {
      id: "queue_004",
      name: "Pickup Counter",
      location: "Entrance",
      status: "paused",
      waiting: 0,
      served: 45,
      avgWait: 2.0,
      estimatedTime: "2-3 min",
      currentServing: "D00",
      qrCode: "qr_pickup_004",
      createdAt: "2024-02-01",
      type: "virtual",
      staff: ["Pickup Staff"],
      settings: {
        maxCapacity: 15,
        autoNotify: false,
        estimatedWaitEnabled: true,
      },
    },
  ]);

  const stats = {
    totalQueues: queues.length,
    activeQueues: queues.filter((q) => q.status === "active").length,
    totalWaiting: queues.reduce((sum, q) => sum + q.waiting, 0),
    totalServed: queues.reduce((sum, q) => sum + q.served, 0),
  };

  const filteredQueues = queues.filter(
    (queue) =>
      queue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCopyLink = (queueId: string) => {
    const queueLink = `https://queuepoint.com/join/${queueId}`;
    navigator.clipboard.writeText(queueLink);
    setCopiedId(queueId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteQueue = (queueId: string) => {
    setQueues(queues.filter((q) => q.id !== queueId));
    setShowDeleteConfirm(false);
  };

  const handleToggleStatus = (queueId: string) => {
    setQueues(
      queues.map((q) =>
        q.id === queueId
          ? { ...q, status: q.status === "active" ? "paused" : "active" }
          : q,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity size={12} className="animate-pulse" />;
      case "paused":
        return <Pause size={12} />;
      default:
        return <XCircle size={12} />;
    }
  };

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
      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-[#0f1215] border-r border-white/10 z-50 transition-transform lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-72"
        }`}
      >
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
            {
              icon: <LayoutGrid size={18} />,
              label: "Dashboard",
              href: "/dashboard",
            },
            {
              icon: <Users size={18} />,
              label: "Queues",
              href: "/dashboard/queues",
              active: true,
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
                  <h1 className="text-2xl font-bold text-white">Queues</h1>
                  <p className="text-sm text-white/40">
                    Manage all your queues in one place
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition"
                >
                  <Plus size={16} />
                  New Queue
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Queues",
                value: stats.totalQueues,
                icon: <LayoutGrid size={20} />,
                trend: "+2 this month",
                color: "emerald",
              },
              {
                label: "Active Queues",
                value: stats.activeQueues,
                icon: <Activity size={20} />,
                trend: `${stats.activeQueues} running`,
                color: "blue",
              },
              {
                label: "Total Waiting",
                value: stats.totalWaiting,
                icon: <Users size={20} />,
                trend: "Currently in line",
                color: "purple",
              },
              {
                label: "Customers Served",
                value: stats.totalServed,
                icon: <UserCheck size={20} />,
                trend: "Today",
                color: "yellow",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-xs text-white/30">{stat.trend}</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search queues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                <Filter size={14} />
                Filter
              </button>
              <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                <Download size={14} />
                Export
              </button>
              <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          {/* Queues List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredQueues.map((queue, index) => (
                <motion.div
                  key={queue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all"
                >
                  {/* Queue Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setSelectedQueue(
                        selectedQueue === queue.id ? null : queue.id,
                      )
                    }
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {queue.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(queue.status)}`}
                          >
                            {getStatusIcon(queue.status)}
                            <span className="capitalize">{queue.status}</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1">
                            <MapPinIcon size={14} />
                            {queue.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {queue.waiting} waiting
                          </span>
                          <span className="flex items-center gap-1">
                            <UserCheck size={14} />
                            {queue.served} served today
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            Avg wait: {queue.avgWait} min
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick Actions */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(queue.id);
                          }}
                          className={`p-2 rounded-lg transition ${
                            queue.status === "active"
                              ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {queue.status === "active" ? (
                            <Pause size={16} />
                          ) : (
                            <Play size={16} />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(queue.id);
                          }}
                          className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition"
                        >
                          {copiedId === queue.id ? (
                            <Check size={16} className="text-emerald-400" />
                          ) : (
                            <CopyIcon size={16} />
                          )}
                        </button>

                        <div className="relative">
                          <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Current Serving Info */}
                    <div className="mt-4 flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-white/60">
                          Currently serving
                        </span>
                      </div>
                      <div className="text-xl font-bold text-emerald-400">
                        {queue.currentServing}
                      </div>
                      <div className="h-4 w-px bg-white/10" />
                      <div className="text-sm text-white/60">
                        Est. wait:{" "}
                        <span className="text-white">
                          {queue.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedQueue === queue.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 bg-white/[0.01]"
                      >
                        <div className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Quick Stats */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3">
                                Queue Statistics
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/40">
                                      Queue Progress
                                    </span>
                                    <span className="text-white/60">
                                      {queue.waiting}/
                                      {queue.settings.maxCapacity}
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                                      style={{
                                        width: `${(queue.waiting / queue.settings.maxCapacity) * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                  <div>
                                    <div className="text-2xl font-bold text-white">
                                      {queue.avgWait}
                                    </div>
                                    <div className="text-xs text-white/40">
                                      Average wait (min)
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-2xl font-bold text-white">
                                      {queue.served}
                                    </div>
                                    <div className="text-xs text-white/40">
                                      Served today
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Staff & Settings */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3">
                                Staff Assigned
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {queue.staff.map((person, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/60"
                                  >
                                    {person}
                                  </span>
                                ))}
                              </div>

                              <h4 className="text-sm font-semibold text-white mb-3">
                                Queue Settings
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/40">
                                    Max Capacity
                                  </span>
                                  <span className="text-sm text-white">
                                    {queue.settings.maxCapacity}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/40">
                                    Auto-notify
                                  </span>
                                  <span
                                    className={`text-sm ${queue.settings.autoNotify ? "text-emerald-400" : "text-white/40"}`}
                                  >
                                    {queue.settings.autoNotify
                                      ? "Enabled"
                                      : "Disabled"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
                            <button className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 flex items-center gap-2 hover:bg-emerald-500/20">
                              <Eye size={14} />
                              View Live Queue
                            </button>
                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                              <Edit size={14} />
                              Edit Settings
                            </button>
                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                              <QrCode size={14} />
                              Download QR Code
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(true)}
                              className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 flex items-center gap-2 hover:bg-red-500/20"
                            >
                              <Trash2 size={14} />
                              Delete Queue
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredQueues.length === 0 && (
              <div className="text-center py-12">
                <div className="text-white/30 text-sm">No queues found</div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Queue Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#0f1215] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  Create New Queue
                </h2>
                <p className="text-sm text-white/40 mt-1">
                  Set up a new queue for your business
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Queue Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Customer Service Desk"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Main Floor, Section A"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Queue Type
                  </label>
                  <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none">
                    <option>In-person Queue</option>
                    <option>Virtual Queue</option>
                    <option>Appointment-based</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600"
                >
                  Create Queue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper icon component
function MapPinIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
