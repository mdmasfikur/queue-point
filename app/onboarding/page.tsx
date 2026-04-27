"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  Users,
  Clock,
  Smartphone,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    // Business Info
    businessName: "",
    businessType: "",
    address: "",
    website: "",

    // Contact Info
    name: "",
    email: "",
    phone: "",

    // Queue Settings
    queueTypes: [] as string[],
    estimatedWaitTime: "5",
    maxCapacity: "50",
  });

  const businessTypes = [
    "Pharmacy",
    "Retail Store",
    "Restaurant",
    "Bank",
    "Hospital",
    "Government Office",
    "Salon",
    "Other",
  ];

  const queueTypeOptions = [
    { id: "in-person", label: "In-person", icon: <Users size={18} /> },
    { id: "virtual", label: "Virtual Queue", icon: <Smartphone size={18} /> },
    { id: "appointment", label: "Appointments", icon: <Clock size={18} /> },
    { id: "hybrid", label: "Hybrid", icon: <Globe size={18} /> },
  ];

  const steps = [
    { number: 1, title: "Business Info", icon: <Building2 size={18} /> },
    { number: 2, title: "Contact Details", icon: <User size={18} /> },
    { number: 3, title: "Queue Setup", icon: <Clock size={18} /> },
    { number: 4, title: "Review", icon: <CheckCircle size={18} /> },
  ];

  const handleNext = () => {
    // load dashboard
    router.push("/dashboard");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsLoading(false);
    router.push("/dashboard");
  };

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.businessName && formData.businessType;
      case 2:
        return formData.name && formData.email && formData.phone;
      case 3:
        return formData.queueTypes.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1215] to-[#0a0a0a]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <nav className="border-b border-white/5 bg-white/5 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">Q</span>
              </div>
              <span className="text-lg font-semibold text-white">
                Queue<span className="text-emerald-400">Point</span>
              </span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((s, i) => (
                <div key={s.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step >= s.number
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                          : "bg-white/10 text-white/40"
                      }`}
                      animate={{
                        scale: step === s.number ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {step > s.number ? <Check size={20} /> : s.icon}
                    </motion.div>
                    <div className="text-xs mt-2 text-white/60 hidden sm:block">
                      {s.title}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-full h-0.5 bg-white/10">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: step > s.number ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              {/* Step 1: Business Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Tell us about your business
                    </h2>
                    <p className="text-white/50">
                      We&apos;ll use this to customize your queue system
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          updateFormData("businessName", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                        placeholder="e.g., City Pharmacy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Business Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {businessTypes.map((type) => (
                          <motion.button
                            key={type}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateFormData("businessType", type)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                              formData.businessType === type
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Business Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          size={18}
                        />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) =>
                            updateFormData("address", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                          placeholder="Street address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Website (Optional)
                      </label>
                      <div className="relative">
                        <Globe
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          size={18}
                        />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) =>
                            updateFormData("website", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Who&apos;s managing this account?
                    </h2>
                    <p className="text-white/50">
                      We&apos;ll send important updates to this contact
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          size={18}
                        />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            updateFormData("name", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          size={18}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          size={18}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none transition-all"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Queue Setup */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Configure your queue system
                    </h2>
                    <p className="text-white/50">
                      Choose how customers will join your queue
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-3">
                        Queue Types
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {queueTypeOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const updated = formData.queueTypes.includes(
                                option.id,
                              )
                                ? formData.queueTypes.filter(
                                    (t) => t !== option.id,
                                  )
                                : [...formData.queueTypes, option.id];
                              updateFormData("queueTypes", updated);
                            }}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                              formData.queueTypes.includes(option.id)
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-white/10 bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg ${
                                formData.queueTypes.includes(option.id)
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-white/10 text-white/40"
                              }`}
                            >
                              {option.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {option.label}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Est. Wait Time (minutes)
                        </label>
                        <input
                          type="number"
                          value={formData.estimatedWaitTime}
                          onChange={(e) =>
                            updateFormData("estimatedWaitTime", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Max Queue Capacity
                        </label>
                        <input
                          type="number"
                          value={formData.maxCapacity}
                          onChange={(e) =>
                            updateFormData("maxCapacity", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Review your setup
                    </h2>
                    <p className="text-white/50">
                      Everything looks good? Let&apos;s get started!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/[0.03] rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-emerald-400 mb-3">
                        Business Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/40">Business Name:</span>
                          <span className="text-white">
                            {formData.businessName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Business Type:</span>
                          <span className="text-white">
                            {formData.businessType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-emerald-400 mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/40">Name:</span>
                          <span className="text-white">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Email:</span>
                          <span className="text-white">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Phone:</span>
                          <span className="text-white">{formData.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-emerald-400 mb-3">
                        Queue Settings
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/40">Queue Types:</span>
                          <span className="text-white">
                            {formData.queueTypes
                              .map((t) => t.replace("-", " "))
                              .join(", ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Est. Wait Time:</span>
                          <span className="text-white">
                            {formData.estimatedWaitTime} min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Max Capacity:</span>
                          <span className="text-white">
                            {formData.maxCapacity} people
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: step === 1 ? 1 : 1.02 }}
                  whileTap={{ scale: step === 1 ? 1 : 0.98 }}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    step === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft size={18} />
                  Back
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={isLoading}
                  whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
                  whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                  className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    !isLoading
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      {step === 4 ? "Get Started" : "Continue"}
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badge */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-emerald-400" />
                Free for 14 days
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-emerald-400" />
                Cancel anytime
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
