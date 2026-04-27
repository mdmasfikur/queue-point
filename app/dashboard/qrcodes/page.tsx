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
  Settings,
  LogOut,
  Menu,
  Download,
  Share2,
  Copy,
  Check,
  Printer,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  Activity,
  MapPin,
  Mail,
  MessageCircle,
  Building2,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";



export default function QRCodesPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedQR, setSelectedQR] = React.useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = React.useState("medium");

  // Mock QR codes data (shorten uuids for readability)
  const [qrCodes, setQrCodes] = React.useState([
    {
      id: "qr_001",
      name: "Pharmacy Queue",
      queueName: "Pharmacy Counter",
      scans: 1247,
      lastScanned: "2 min ago",
      createdAt: "2024-01-15",
      status: "active",
      url: "https://queuepoint.com/queues/550e84...440000/pharmacy/join",
      location: "Main Floor",
      design: "default",
      downloads: 342,
    },
    {
      id: "qr_002",
      name: "Cashier Queue",
      queueName: "Cashier Counter",
      scans: 2341,
      lastScanned: "5 min ago",
      createdAt: "2024-01-15",
      status: "active",
      url: "https://queuepoint.com/queues/550e84...440001/cashier/join",
      location: "Main Floor",
      design: "rounded",
      downloads: 567,
    },
    {
      id: "qr_003",
      name: "Consultation",
      queueName: "Consultation Room",
      scans: 567,
      lastScanned: "15 min ago",
      createdAt: "2024-01-20",
      status: "active",
      url: "https://queuepoint.com/queues/550e84...440002/consultation/join",
      location: "2nd Floor",
      design: "dots",
      downloads: 123,
    },
    {
      id: "qr_004",
      name: "Pickup Counter",
      queueName: "Pickup Counter",
      scans: 890,
      lastScanned: "1 hour ago",
      createdAt: "2024-02-01",
      status: "inactive",
      url: "https://queuepoint.com/queues/550e84...440003/pickup/join",
      location: "Entrance",
      design: "default",
      downloads: 234,
    },
  ]);

  const stats = {
    totalQRCodes: qrCodes.length,
    totalScans: qrCodes.reduce((sum, qr) => sum + qr.scans, 0),
    activeQRCodes: qrCodes.filter((qr) => qr.status === "active").length,
    avgScansPerDay: Math.round(
      qrCodes.reduce((sum, qr) => sum + qr.scans, 0) / 30,
    ),
  };

  const filteredQRCodes = qrCodes.filter(
    (qr) =>
      qr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qr.queueName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadQR = (qr: (typeof qrCodes)[0]) => {
    console.log(`Downloading QR code for ${qr.name}`);
    // In production, this would generate and download the QR code image
  };

  const handleDeleteQR = (id: string) => {
    setQrCodes(qrCodes.filter((qr) => qr.id !== id));
    setShowDeleteConfirm(false);
  };

  const getQRCodeSize = () => {
    switch (selectedSize) {
      case "small":
        return 128;
      case "medium":
        return 256;
      case "large":
        return 512;
      default:
        return 256;
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
              active: true,
            },
            {
              icon: <Building2 size={18} />,
              label: "Account",
              href: "/dashboard/account",
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-white/60 hover:text-white"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">QR Codes</h1>
                  <p className="text-sm text-white/40">
                    Manage and track your queue QR codes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition"
                >
                  <Plus size={16} />
                  Generate QR Code
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
                label: "Total QR Codes",
                value: stats.totalQRCodes,
                icon: <QrCode size={20} />,
                trend: "+2 this month",
                color: "emerald",
              },
              {
                label: "Total Scans",
                value: stats.totalScans.toLocaleString(),
                icon: <Eye size={20} />,
                trend: "+23% vs last month",
                color: "blue",
              },
              {
                label: "Active Codes",
                value: stats.activeQRCodes,
                icon: <Activity size={20} />,
                trend: `${stats.activeQRCodes} active`,
                color: "purple",
              },
              {
                label: "Avg Daily Scans",
                value: stats.avgScansPerDay,
                icon: <TrendingUp size={20} />,
                trend: "+12% increase",
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
                  placeholder="Search QR codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md text-sm capitalize transition ${
                      selectedSize === size
                        ? "bg-emerald-500 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                <Filter size={14} />
                Filter
              </button>
              <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          {/* QR Codes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredQRCodes.map((qr, index) => (
                <motion.div
                  key={qr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all group"
                >
                  {/* QR Code Preview */}
                  <div className="relative bg-white p-6 flex items-center justify-center">
                    <div className="relative">
                      {/* Simulated QR Code */}
                      <div
                        className="bg-black rounded-lg flex items-center justify-center"
                        style={{
                          width: getQRCodeSize(),
                          height: getQRCodeSize(),
                        }}
                      >
                        <QrCode
                          size={getQRCodeSize() * 0.6}
                          className="text-white"
                        />
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownloadQR(qr)}
                            className="p-2 bg-white rounded-lg hover:bg-emerald-500 transition-colors"
                          >
                            <Download size={16} className="text-black" />
                          </button>
                          <button
                            onClick={() => handleCopyLink(qr.url, qr.id)}
                            className="p-2 bg-white rounded-lg hover:bg-emerald-500 transition-colors"
                          >
                            {copiedId === qr.id ? (
                              <Check size={16} className="text-emerald-500" />
                            ) : (
                              <Copy size={16} className="text-black" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Info */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{qr.name}</h3>
                        <p className="text-xs text-white/40 mt-1">
                          {qr.queueName}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          qr.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {qr.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-white/40">Scans</span>
                        <span className="text-white font-medium">
                          {qr.scans.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40">Last Scanned</span>
                        <span className="text-white/60">{qr.lastScanned}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40">Location</span>
                        <span className="text-white/60 flex items-center gap-1">
                          <MapPin size={12} />
                          {qr.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40">Downloads</span>
                        <span className="text-white/60">{qr.downloads}</span>
                      </div>
                    </div>

                    {/* QR Code URL */}
                    <div className="mt-3 p-2 bg-white/5 rounded-lg">
                      <code className="text-xs text-white/40 truncate block">
                        {qr.url}
                      </code>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleDownloadQR(qr)}
                        className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-sm text-white/60 flex items-center justify-center gap-2 hover:bg-white/10 transition"
                      >
                        <Download size={14} />
                        Download
                      </button>
                      <button
                        onClick={() => handleCopyLink(qr.url, qr.id)}
                        className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-sm text-white/60 flex items-center justify-center gap-2 hover:bg-white/10 transition"
                      >
                        {copiedId === qr.id ? (
                          <>
                            <Check size={14} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy Link
                          </>
                        )}
                      </button>
                      <button className="px-3 py-2 bg-white/5 rounded-lg text-sm text-white/60 hover:bg-red-500/10 hover:text-red-400 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredQRCodes.length === 0 && (
            <div className="text-center py-12">
              <QrCode size={48} className="text-white/20 mx-auto mb-4" />
              <div className="text-white/30 text-sm">No QR codes found</div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600"
              >
                Generate your first QR code
              </button>
            </div>
          )}

          {/* Share Options */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Share2 size={20} className="text-emerald-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Share Your QR Codes
                </h3>
                <p className="text-sm text-white/40">
                  Promote your queues across multiple channels
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  color: "bg-blue-500/10 text-blue-400",
                },
                {
                  icon: <MessageCircle size={18} />,
                  label: "SMS",
                  color: "bg-green-500/10 text-green-400",
                },
                {
                  icon: <FaTwitter size={18} />,
                  label: "Twitter",
                  color: "bg-sky-500/10 text-sky-400",
                },
                {
                  icon: <FaFacebook size={18} />,
                  label: "Facebook",
                  color: "bg-blue-600/10 text-blue-400",
                },
                {
                  icon: <FaLinkedin size={18} />,
                  label: "LinkedIn",
                  color: "bg-blue-700/10 text-blue-400",
                },
              ].map((platform) => (
                <button
                  key={platform.label}
                  className={`px-4 py-2 rounded-lg ${platform.color} flex items-center gap-2 hover:opacity-80 transition`}
                >
                  {platform.icon}
                  <span className="text-sm">{platform.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Print Options */}
          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
              <Printer size={14} />
              Print All QR Codes
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600">
              <Download size={14} />
              Bulk Download
            </button>
          </div>
        </main>
      </div>

      {/* Create QR Code Modal */}
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
              className="relative bg-[#0f1215] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  Generate QR Code
                </h2>
                <p className="text-sm text-white/40 mt-1">
                  Create a new QR code for your queue
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Select Queue
                  </label>
                  <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none">
                    <option>Pharmacy Counter</option>
                    <option>Cashier Counter</option>
                    <option>Consultation Room</option>
                    <option>Pickup Counter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    QR Code Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Main Entrance QR"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Design Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["default", "rounded", "dots"].map((style) => (
                      <button
                        key={style}
                        className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:bg-white/10 capitalize"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Size
                  </label>
                  <div className="flex gap-2">
                    {["Small (128px)", "Medium (256px)", "Large (512px)"].map(
                      (size) => (
                        <button
                          key={size}
                          className="flex-1 p-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:bg-white/10"
                        >
                          {size}
                        </button>
                      ),
                    )}
                  </div>
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
                  Generate QR Code
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
