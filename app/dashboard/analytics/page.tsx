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
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  UserX,
  Clock as ClockIcon,
  Star,
  Zap,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Building2,
  Brain,
  FileText,
  Share2,
  Printer,
} from "lucide-react";

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState("week");
  const [selectedMetric, setSelectedMetric] = React.useState("waitTime");
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  // Mock analytics data
  const analyticsData = {
    summary: {
      totalCustomers: 3421,
      avgWaitTime: 4.2,
      satisfaction: 97,
      abandonmentRate: 8.5,
      peakHour: "2:00 PM",
      busiestDay: "Monday",
    },
    trends: {
      customers: { value: 3421, change: 12.5, trend: "up" },
      waitTime: { value: 4.2, change: -8.3, trend: "down" },
      satisfaction: { value: 97, change: 3.2, trend: "up" },
      abandonment: { value: 8.5, change: -2.1, trend: "down" },
    },
    hourlyData: [
      { hour: "9 AM", customers: 45, waitTime: 3.2, satisfaction: 95 },
      { hour: "10 AM", customers: 78, waitTime: 4.1, satisfaction: 94 },
      { hour: "11 AM", customers: 112, waitTime: 5.2, satisfaction: 93 },
      { hour: "12 PM", customers: 145, waitTime: 6.1, satisfaction: 92 },
      { hour: "1 PM", customers: 168, waitTime: 6.8, satisfaction: 91 },
      { hour: "2 PM", customers: 189, waitTime: 7.2, satisfaction: 90 },
      { hour: "3 PM", customers: 167, waitTime: 6.5, satisfaction: 92 },
      { hour: "4 PM", customers: 134, waitTime: 5.4, satisfaction: 93 },
      { hour: "5 PM", customers: 98, waitTime: 4.2, satisfaction: 94 },
      { hour: "6 PM", customers: 56, waitTime: 3.1, satisfaction: 96 },
    ],
    dailyData: [
      { day: "Mon", customers: 520, waitTime: 4.5, satisfaction: 96 },
      { day: "Tue", customers: 485, waitTime: 4.2, satisfaction: 97 },
      { day: "Wed", customers: 510, waitTime: 4.3, satisfaction: 96 },
      { day: "Thu", customers: 495, waitTime: 4.1, satisfaction: 97 },
      { day: "Fri", customers: 580, waitTime: 4.8, satisfaction: 95 },
      { day: "Sat", customers: 420, waitTime: 3.9, satisfaction: 98 },
      { day: "Sun", customers: 311, waitTime: 3.4, satisfaction: 99 },
    ],
    queuePerformance: [
      {
        name: "Pharmacy",
        customers: 856,
        avgWait: 3.5,
        satisfaction: 98,
        abandonment: 6.2,
      },
      {
        name: "Cashier",
        customers: 1234,
        avgWait: 5.2,
        satisfaction: 95,
        abandonment: 9.8,
      },
      {
        name: "Consultation",
        customers: 567,
        avgWait: 8.5,
        satisfaction: 94,
        abandonment: 12.3,
      },
      {
        name: "Pickup",
        customers: 764,
        avgWait: 2.0,
        satisfaction: 99,
        abandonment: 3.5,
      },
    ],
    insights: [
      {
        title: "Peak Hours Identified",
        description:
          "Your busiest time is between 1 PM - 3 PM. Consider adding more staff during these hours.",
        impact: "high",
        action: "Schedule additional staff",
      },
      {
        title: "Wait Time Reduction",
        description:
          "Average wait time decreased by 8.3% this week. Great improvement!",
        impact: "positive",
        action: "Maintain current strategy",
      },
      {
        title: "Abandonment Rate",
        description:
          "8.5% of customers leave due to long waits. Optimize queue flow to reduce this.",
        impact: "medium",
        action: "Review queue settings",
      },
    ],
  };

  const maxCustomers = Math.max(
    ...analyticsData.hourlyData.map((d) => d.customers),
  );
  const maxWaitTime = Math.max(
    ...analyticsData.hourlyData.map((d) => d.waitTime),
  );

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setShowExportMenu(false);
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
              active: true,
            },
            {
              icon: <QrCode size={18} />,
              label: "QR Codes",
              href: "/dashboard/qrcodes",
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
                  <h1 className="text-2xl font-bold text-white">Analytics</h1>
                  <p className="text-sm text-white/40">
                    Track your queue performance metrics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Date Range Selector */}
                <div className="flex gap-2">
                  {["day", "week", "month", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                        dateRange === range
                          ? "bg-emerald-500 text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Export Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10"
                  >
                    <Download size={14} />
                    Export
                  </button>
                  <AnimatePresence>
                    {showExportMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-36 bg-[#0f1215] border border-white/10 rounded-lg shadow-2xl z-50"
                      >
                        {["CSV", "PDF", "PNG"].map((format) => (
                          <button
                            key={format}
                            onClick={() => handleExport(format)}
                            className="w-full text-left px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
                          >
                            Export as {format}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Customers",
                value: analyticsData.summary.totalCustomers.toLocaleString(),
                change: analyticsData.trends.customers.change,
                trend: analyticsData.trends.customers.trend,
                icon: <Users size={20} />,
                color: "emerald",
              },
              {
                label: "Avg Wait Time",
                value: `${analyticsData.summary.avgWaitTime} min`,
                change: analyticsData.trends.waitTime.change,
                trend: analyticsData.trends.waitTime.trend,
                icon: <ClockIcon size={20} />,
                color: "blue",
              },
              {
                label: "Satisfaction",
                value: `${analyticsData.summary.satisfaction}%`,
                change: analyticsData.trends.satisfaction.change,
                trend: analyticsData.trends.satisfaction.trend,
                icon: <Star size={20} />,
                color: "yellow",
              },
              {
                label: "Abandonment",
                value: `${analyticsData.summary.abandonmentRate}%`,
                change: analyticsData.trends.abandonment.change,
                trend: analyticsData.trends.abandonment.trend,
                icon: <UserX size={20} />,
                color: "purple",
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-${metric.color}-500/10 text-${metric.color}-400`}
                  >
                    {metric.icon}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      metric.trend === "up"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Customer Traffic Chart */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Customer Traffic
                  </h3>
                  <p className="text-sm text-white/40">Hourly customer flow</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
                    Hourly
                  </button>
                  <button className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">
                    Daily
                  </button>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-3">
                {analyticsData.hourlyData.map((data, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/40">{data.hour}</span>
                      <span className="text-white/60">
                        {data.customers} customers
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(data.customers / maxCustomers) * 100}%`,
                        }}
                        transition={{ duration: 0.8, delay: i * 0.02 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full flex items-center px-3"
                      >
                        <span className="text-xs text-white font-medium">
                          {data.customers}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wait Time Chart */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Average Wait Time
                  </h3>
                  <p className="text-sm text-white/40">Minutes by hour</p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon size={14} className="text-emerald-400" />
                  <span className="text-xs text-white/40">
                    Peak: {maxWaitTime} min
                  </span>
                </div>
              </div>

              {/* Line Chart Area */}
              <div className="relative h-64">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="waitTimeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
                      <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                    </linearGradient>
                  </defs>
                  {/* Area under the line */}
                  <motion.path
                    d={`
                      M 0 ${200 - (analyticsData.hourlyData[0].waitTime / maxWaitTime) * 180}
                      ${analyticsData.hourlyData
                        .map(
                          (d, i) =>
                            `L ${(i / (analyticsData.hourlyData.length - 1)) * 500} ${200 - (d.waitTime / maxWaitTime) * 180}`,
                        )
                        .join(" ")}
                      L 500 200 L 0 200 Z
                    `}
                    fill="url(#waitTimeGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Line */}
                  <motion.path
                    d={analyticsData.hourlyData
                      .map(
                        (d, i) =>
                          `${i === 0 ? "M" : "L"} ${(i / (analyticsData.hourlyData.length - 1)) * 500} ${200 - (d.waitTime / maxWaitTime) * 180}`,
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  {/* Data points */}
                  {analyticsData.hourlyData.map((d, i) => (
                    <motion.circle
                      key={i}
                      cx={(i / (analyticsData.hourlyData.length - 1)) * 500}
                      cy={200 - (d.waitTime / maxWaitTime) * 180}
                      r="3"
                      fill="#10b981"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </svg>
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-2">
                  {analyticsData.hourlyData
                    .filter((_, i) => i % 2 === 0)
                    .map((data, i) => (
                      <div key={i} className="text-xs text-white/40">
                        {data.hour}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Performance */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Weekly Performance
                </h3>
                <p className="text-sm text-white/40">Day by day breakdown</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-white/40">Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-white/40">Wait Time (min)</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {analyticsData.dailyData.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm font-medium text-white/60 mb-2">
                    {day.day}
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-32 flex items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.customers / 600) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-8 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg absolute bottom-0"
                      />
                    </div>
                    <div className="text-xs text-white/60">{day.customers}</div>
                    <div className="text-xs text-emerald-400">
                      {day.waitTime} min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Queue Performance Table */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Queue Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-white/40">
                      Queue Name
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-white/40">
                      Customers
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-white/40">
                      Avg Wait (min)
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-white/40">
                      Satisfaction
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-white/40">
                      Abandonment
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-white/40">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.queuePerformance.map((queue, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 text-white font-medium">
                        {queue.name}
                      </td>
                      <td className="py-3 text-right text-white/60">
                        {queue.customers}
                      </td>
                      <td className="py-3 text-right text-white/60">
                        {queue.avgWait}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Star
                            size={14}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          <span className="text-white/60">
                            {queue.satisfaction}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-white/60">
                        {queue.abandonment}%
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            queue.abandonment < 7
                              ? "bg-emerald-500/10 text-emerald-400"
                              : queue.abandonment < 10
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {queue.abandonment < 7
                            ? "Good"
                            : queue.abandonment < 10
                              ? "Average"
                              : "Needs Attention"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Brain size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  AI Insights
                </h3>
                <p className="text-sm text-white/40">
                  Actionable recommendations based on your data
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {analyticsData.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="flex items-start gap-2 mb-2">
                    {insight.impact === "high" && (
                      <AlertCircle
                        size={16}
                        className="text-yellow-400 mt-0.5"
                      />
                    )}
                    {insight.impact === "positive" && (
                      <CheckCircle
                        size={16}
                        className="text-emerald-400 mt-0.5"
                      />
                    )}
                    {insight.impact === "medium" && (
                      <Zap size={16} className="text-blue-400 mt-0.5" />
                    )}
                    <h4 className="font-semibold text-white text-sm">
                      {insight.title}
                    </h4>
                  </div>
                  <p className="text-xs text-white/40 mb-3">
                    {insight.description}
                  </p>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    {insight.action}
                    <ChevronRight size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Export & Share Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
              <Printer size={14} />
              Print Report
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 flex items-center gap-2 hover:bg-white/10">
              <Share2 size={14} />
              Share
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-600">
              <FileText size={14} />
              Generate Full Report
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
