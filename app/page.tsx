// app/page.tsx - QueuePoint Professional Landing Page (Fixed)
"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  Activity,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
  Globe,
  Shield,
  Zap,
  Smartphone,
  Menu,
  X,
  LayoutGrid,
  BellRing,
  QrCode,
  Timer,
  Gauge,
  ChevronDown,
  Star,
} from "lucide-react";
import Link from "next/link";

function MagneticButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * 0.2;
      const moveY = (e.clientY - centerY) * 0.2;
      x.set(moveX);
      y.set(moveY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function AnimatedGradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export default function QueuePointLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f1215] to-[#0a0a0a] -z-20" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a1a' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 -z-20" />
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -z-15" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-15" />

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection />
      <ProblemSolutionSection />
      <WhyQueuePointSection />
      <HowItWorksSection />
      <FeaturesGridSection />
      <PerformanceSection />
      <TrustIndicatorsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="text-white text-lg font-semibold tracking-tight">
                    Q
                  </span>
                </div>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Queue<span className="text-emerald-400">Point</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {["Product", "How it works", "Features", "Enterprise"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm font-medium text-white/60 hover:text-white transition-all duration-300"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/onboarding"
                className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300"
              >
                Get started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-80 bg-[#0f1215] border-l border-white/10 z-50 p-6 lg:hidden"
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white/60"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {["Product", "How it works", "Features", "Enterprise"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white/70 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              {item}
            </a>
          ))}
          <Link
            href="/onboarding"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-6 py-3 bg-white text-black rounded-full text-center font-semibold"
          >
            Get started
          </Link>
        </div>
      </motion.div>
    </>
  );
}

function HeroSection() {
  const floatingIcons = [
    { icon: <Zap size={60} />, delay: 0, x: -100, y: -50 },
    { icon: <Clock size={60} />, delay: 2, x: 100, y: -80 },
    { icon: <Users size={60} />, delay: 4, x: -80, y: 100 },
    { icon: <Shield size={60} />, delay: 1, x: 120, y: 60 },
    { icon: <Activity size={60} />, delay: 3, x: -120, y: -30 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Floating Icons in Background */}
      {floatingIcons.map(({ icon, delay, x, y: yOffset }, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-400/20"
          style={{ x, y: yOffset }}
          animate={{
            y: [yOffset, yOffset - 30, yOffset],
            x: [x, x + 20, x],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 relative group"
            animate={{
              scale: [1, 1.02, 1],
              borderColor: [
                "rgba(255,255,255,0.1)",
                "rgba(16,185,129,0.4)",
                "rgba(255,255,255,0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Glitch layers */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-emerald-400" />
            </motion.div>

            <motion.span
              className="text-xs font-bold relative"
              animate={{
                textShadow: [
                  "0 0 0px rgba(16,185,129,0)",
                  "0 0 5px rgba(16,185,129,0.8)",
                  "0 0 0px rgba(16,185,129,0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white/90">Queue Management</span>
              <motion.span
                className="text-emerald-400 mx-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✦
              </motion.span>
              <span className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                Reimagined!
              </span>
            </motion.span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
            Eliminate physical lines.
            <br />
            <AnimatedGradientText>
              Give customers their time back.
            </AnimatedGradientText>
          </h1>

          <motion.p
            className="text-xl text-white/50 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            QueuePoint is a modern queue management platform that lets customers
            join remotely, track their position in real-time, and arrive exactly
            when it&apos;s their turn.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MagneticButton
              href="/onboarding"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              Start free trial
              <ArrowRight size={18} />
            </MagneticButton>
            <motion.a
              href="#how-it-works"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See how it works
              <ChevronDown size={18} />
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 justify-center mt-12 text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[
              "✓ No hardware required",
              "✓ Deploy in minutes",
              "✓ Works on any device",
            ].map((text, i) => (
              <motion.span
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSolutionSection() {
  const problems = [
    { stat: "73%", label: "of customers abandon purchases due to long waits" },
    {
      stat: "42%",
      label: "reduction in perceived wait time with virtual queuing",
    },
    { stat: "$160B", label: "annual revenue lost from customer wait fatigue" },
  ];

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-400 text-sm font-semibold tracking-wide">
              The Problem
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
              Physical queues are <br />
              bad for business.
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Long lines drive customers away, stress your staff, and create
              chaotic environments. Traditional queue management hasn&apos;t
              evolved — until now.
            </p>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-emerald-400 min-w-[80px]">
                    {problem.stat}
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                  <div className="text-white/60 text-sm">{problem.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
                <Zap size={14} /> The Solution
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Virtual queuing that works
            </h3>
            <p className="text-white/50 text-center mb-6">
              Customers join from anywhere. Staff serve one at a time. Everyone
              wins.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-emerald-400">60%</div>
                <div className="text-xs text-white/40 mt-1">
                  Lower abandonment
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-emerald-400">2x</div>
                <div className="text-xs text-white/40 mt-1">
                  Space efficiency
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyQueuePointSection() {
  const reasons = [
    {
      icon: <Zap size={28} />,
      title: "Lightning fast setup",
      desc: "Get your first queue live in under 5 minutes. No technical expertise required.",
    },
    {
      icon: <Smartphone size={28} />,
      title: "Works everywhere",
      desc: "Customers join via QR code or link — no app download, no friction.",
    },
    {
      icon: <Globe size={28} />,
      title: "Manage at scale",
      desc: "Handle unlimited queues across multiple locations from one dashboard.",
    },
    {
      icon: <Shield size={28} />,
      title: "Enterprise security",
      desc: "End-to-end encryption, audit logs, and compliance ready.",
    },
  ];

  return (
    <section id="product" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 text-sm font-semibold tracking-wide">
            Why QueuePoint
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Built for modern businesses
          </h2>
          <p className="text-white/50 text-lg">
            Everything you need to transform your customer waiting experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 text-emerald-400">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Set up your queue",
      desc: "Create your first queue in seconds. Customize wait times, token format, and notifications.",
      icon: <LayoutGrid size={24} />,
    },
    {
      step: "02",
      title: "Share the link",
      desc: "Display a QR code at your location or share a direct link. Customers join instantly.",
      icon: <QrCode size={24} />,
    },
    {
      step: "03",
      title: "Customers wait anywhere",
      desc: "They get real-time position updates and optional notifications when their turn approaches.",
      icon: <BellRing size={24} />,
    },
    {
      step: "04",
      title: "Serve with one click",
      desc: "Staff sees the queue, serves the next customer, and moves on — no confusion, no crowding.",
      icon: <Users size={24} />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 text-sm font-semibold tracking-wide">
            Simple workflow
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-4">
            How QueuePoint works
          </h2>
          <p className="text-white/50 text-lg">
            Four steps to a better waiting experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-5xl font-bold text-white absolute top-0 right-0 m-4 opacity-50">
                {step.step}
              </div>
              <div className="relative z-10 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 text-emerald-400">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Demo Preview */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto relative overflow-hidden group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, borderColor: "rgba(16,185,129,0.3)" }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Header with animations */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-xs text-white/40 mb-1 flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Your queue
              </div>
              <div className="text-xl font-semibold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                Pharmacy Counter
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-right"
            >
              <div className="text-xs text-white/40 mb-1">
                Currently serving
              </div>
              <motion.div
                className="text-3xl font-bold text-emerald-400 inline-block"
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    "0 0 0px rgba(16,185,129,0)",
                    "0 0 10px rgba(16,185,129,0.5)",
                    "0 0 0px rgba(16,185,129,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                #A42
              </motion.div>
            </motion.div>
          </div>

          {/* Queue Progress Section */}
          <div className="mb-6 relative z-10">
            <div className="flex justify-between text-sm text-white/40 mb-3">
              <motion.span
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Users size={14} />
                Your position
              </motion.span>
              <motion.span
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Timer size={14} />
                Estimated wait:
                <motion.span
                  className="text-emerald-400 font-semibold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  5 min
                </motion.span>
              </motion.span>
            </div>

            {/* Animated Progress Bar */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full relative"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "70%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Animated shine effect on progress bar */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Progress markers */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                {[25, 50, 75].map((pos) => (
                  <motion.div
                    key={pos}
                    className="w-0.5 h-4 bg-white/20 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + pos / 100 }}
                  />
                ))}
              </div>
            </div>

            {/* People ahead with avatars */}
            <motion.div
              className="flex items-center justify-between mt-6 p-4 bg-white/[0.03] rounded-xl border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    { color: "bg-blue-500", letter: "J" },
                    { color: "bg-purple-500", letter: "M" },
                    { color: "bg-pink-500", letter: "S" },
                  ].map((person, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-8 ${person.color} rounded-full border-2 border-white/10 flex items-center justify-center text-xs font-bold`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {person.letter}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-medium text-white/80">
                    3 people ahead of you
                  </div>
                  <div className="text-xs text-white/30">
                    You&apos;re next in line after them
                  </div>
                </div>
              </div>

              {/* Live indicator */}
              <motion.div
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-emerald-400 font-mono">LIVE</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.button
            className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span className="relative z-10">Join this queue</span>
            <ArrowRight
              size={16}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />

            {/* Button hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>

        {/* Dashboard Preview Section */}
        <motion.div
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-emerald-400 text-sm font-semibold tracking-wide">
              Powerful Dashboard
            </span>
            <p className="text-white/40 text-sm mt-1">
              Manage everything from one place
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Queue Card (Live) */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02, borderColor: "rgba(16,185,129,0.3)" }}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div>
                    <div className="text-xs text-white/40">Active Queue</div>
                    <div className="text-lg font-semibold text-white">
                      Pharmacy Counter
                    </div>
                  </div>
                </div>
                <motion.div
                  className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LIVE
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-xs text-white/40 mb-1">
                    Currently Serving
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-emerald-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    #A42
                  </motion.div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-xs text-white/40 mb-1">
                    Total Waiting
                  </div>
                  <div className="text-2xl font-bold text-white">12</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Your Position</span>
                  <span>Est. Wait: 5 min</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "70%" }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <div className="text-center mt-3 text-sm text-white/60">
                  3 people ahead of you
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <motion.button
                  className="flex-1 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Notify me
                </motion.button>
                <motion.button
                  className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Dashboard Features */}
            <motion.div
              className="space-y-4"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {/* Analytics Card */}
              <motion.div
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 hover:border-emerald-500/20 transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-emerald-400" />
                    <span className="text-sm font-medium">
                      Today&apos;s Activity
                    </span>
                  </div>
                  <span className="text-xs text-white/30">Updated now</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-2xl font-bold text-white">156</div>
                    <div className="text-xs text-white/40">
                      Customers served
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">
                      4.2min
                    </div>
                    <div className="text-xs text-white/40">Avg. wait time</div>
                  </div>
                </div>
              </motion.div>

              {/* Multi-Queue Card */}
              <motion.div
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 hover:border-emerald-500/20 transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <LayoutGrid size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium">Active Queues</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Pharmacy", count: "8", serving: "A42" },
                    { name: "Cashier", count: "12", serving: "B03" },
                    { name: "Consultation", count: "3", serving: "C07" },
                  ].map((queue, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <div>
                        <div className="text-sm font-medium">{queue.name}</div>
                        <div className="text-xs text-white/40">
                          Serving: {queue.serving}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          {queue.count}
                        </div>
                        <div className="text-xs text-white/30">waiting</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 hover:border-emerald-500/20 transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium">Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-white/5 rounded-lg text-xs text-white/60 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    + New Queue
                  </button>
                  <button className="px-3 py-2 bg-white/5 rounded-lg text-xs text-white/60 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    Export Data
                  </button>
                  <button className="px-3 py-2 bg-white/5 rounded-lg text-xs text-white/60 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    View Reports
                  </button>
                  <button className="px-3 py-2 bg-white/5 rounded-lg text-xs text-white/60 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    Settings
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Row - Additional Metrics */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              {
                label: "Satisfaction Rate",
                value: "98%",
                icon: <Star size={14} />,
                color: "text-yellow-400",
              },
              {
                label: "Peak Hour",
                value: "2-3 PM",
                icon: <Clock size={14} />,
                color: "text-blue-400",
              },
              {
                label: "Avg. Service Time",
                value: "2m 30s",
                icon: <Timer size={14} />,
                color: "text-emerald-400",
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-3 text-center hover:border-emerald-500/20 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`${metric.color} mb-1 flex justify-center`}>
                  {metric.icon}
                </div>
                <div className="text-lg font-bold text-white">
                  {metric.value}
                </div>
                <div className="text-xs text-white/40">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesGridSection() {
  const features = [
    {
      title: "Real-time updates",
      desc: "Live position tracking and wait time estimates",
    },
    {
      title: "Multi-location support",
      desc: "Manage unlimited queues across all your sites",
    },
    {
      title: "Analytics dashboard",
      desc: "Track wait times, throughput, and customer flow",
    },
    { title: "SMS & webhooks", desc: "Notify customers when it's their turn" },
    {
      title: "Staff dashboard",
      desc: "Simple interface to serve the next customer",
    },
    {
      title: "Exportable reports",
      desc: "CSV exports for compliance and analysis",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 text-sm font-semibold tracking-wide">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Everything you need
          </h2>
          <p className="text-white/50 text-lg">
            No bloat. Just the tools that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <CheckCircle
                size={18}
                className="text-emerald-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-white/40 text-xs mt-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerformanceSection() {
  const metrics = [
    { value: "< 50ms", label: "API response time", icon: <Gauge size={20} /> },
    {
      value: "10,000+",
      label: "Concurrent users supported",
      icon: <Users size={20} />,
    },
    { value: "99.9%", label: "Uptime SLA", icon: <Shield size={20} /> },
    {
      value: "Sub-second",
      label: "Real-time updates",
      icon: <Timer size={20} />,
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-400 text-sm font-semibold tracking-wide">
              Built for scale
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Fast, reliable, <br />
              and enterprise-ready.
            </h2>
            <p className="text-white/50 text-lg mb-8">
              QueuePoint is built on modern infrastructure that handles
              thousands of concurrent users while maintaining lightning-fast
              response times.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-xs text-white/40 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-white/30 font-mono">
                API response
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>GET /api/queue/status</span>
                  <span>42ms</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className="bg-emerald-500 h-1 rounded-full"
                    style={{ width: "95%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>POST /api/tokens</span>
                  <span>38ms</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className="bg-emerald-500 h-1 rounded-full"
                    style={{ width: "96%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>PATCH /api/tokens/serve</span>
                  <span>35ms</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className="bg-emerald-500 h-1 rounded-full"
                    style={{ width: "97%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/30">
              Built with Fastify · SQLite WAL · TypeScript
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustIndicatorsSection() {
  const stats = [
    { value: "500+", label: "Businesses served" },
    { value: "250k+", label: "Customers queued" },
    { value: "98%", label: "Customer satisfaction" },
    { value: "4.9", label: "Average rating" },
  ];

  const logos = [
    "Memorial Hospital",
    "First National Bank",
    "City Government",
    "Retail Plus",
  ];

  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-emerald-400">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/30 text-sm mb-6">
            Trusted by organizations worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {logos.map((logo, i) => (
              <span key={i} className="text-white/40 text-sm font-medium">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Ready to eliminate waiting rooms?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
            Join hundreds of businesses that have transformed their customer
            experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300"
            >
              Start free trial
            </Link>
            <a
              href="https://github.com/MasfikurDev/queuepoint"
              target="_blank"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
            >
              View on GitHub
            </a>
          </div>
          <p className="text-white/30 text-sm mt-6">
            No credit card required. Free 14-day trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q</span>
            </div>
            <span className="text-sm font-semibold text-white/60">
              Queue<span className="text-emerald-400">Point</span>
            </span>
            <span className="text-xs text-white/20">© 2026</span>
          </div>

          <div className="flex gap-6 text-xs text-white/30">
            <a href="#product" className="hover:text-white/60">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-white/60">
              How it works
            </a>
            <a href="#features" className="hover:text-white/60">
              Features
            </a>
            <a
              href="https://github.com/MasfikurDev/queuepoint"
              target="_blank"
              className="hover:text-white/60"
            >
              GitHub
            </a>
          </div>

          <div className="text-xs text-white/20">
            Built for speed. Ready for scale.
          </div>
        </div>
      </div>
    </footer>
  );
}
