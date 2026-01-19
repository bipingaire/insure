"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  Map, 
  FileText, 
  CheckCircle,
  Star,
  ArrowDown
} from "lucide-react";

// --- COMPONENTS ---

// 1. Floating Action Buttons (FAB)
const FloatingActions = ({ onChat }: { onChat: () => void }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
    <a href="tel:+13364421139" className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-blue-900 shadow-xl hover:scale-110 transition-transform border-2 border-blue-50">
      <Phone size={24} />
      <span className="sr-only">Call Us</span>
    </a>
    <button
      onClick={onChat}
      className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition-transform hover:bg-green-400"
    >
      <MessageCircle size={28} />
      <span className="sr-only">Live Chat</span>
    </button>
  </div>
);

// 2. Navigation Bar
const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-100">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 relative">
        <Image src="/supertruck-logo.svg" alt="Super Truck" fill sizes="40px" className="object-contain" />
      </div>
      <span className="font-extrabold text-xl tracking-tight text-blue-900">
        Super Truck <span className="text-green-500">Insurance</span>
      </span>
    </div>
    <div className="flex items-center gap-4">
      <a href="tel:+13364421139" className="hidden md:flex items-center gap-2 font-semibold text-blue-900 text-sm">
        <Phone size={16} /> 336-442-1139
      </a>
    </div>
  </nav>
);

// 3. The Gamified Form Wizard
const QuoteWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    dotNumber: "",
    cdlYears: "3-5 Years",
    cleanRecord: false,
    vehicleType: "Semi",
    vin: "",
    region: "Over the Road (OTR - 48 States)",
    cargo: "",
    cleanLosses: true
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Quote Unlocked! Rate: $8,500/yr. Check email.");
        setIsSubmitting(false);
        setStep(1);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-slate-100 overflow-hidden relative z-20">
      
      {/* Header / Progress */}
      <div className="bg-blue-900 p-6 text-white relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="flex justify-between items-end mb-3 relative z-10">
          <span className="text-xs font-bold uppercase text-green-400 tracking-wider flex items-center gap-1">
            <ShieldCheck size={14} /> Rate Simulator
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Level {step} <span className="text-blue-300 text-base font-medium">/ {totalSteps}</span>
          </span>
        </div>
        
        <div className="w-full bg-blue-950/50 h-3 rounded-full relative z-10 backdrop-blur-md overflow-hidden">
          <motion.div 
            className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 md:p-8 min-h-[400px] flex flex-col justify-between relative bg-white">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CARRIER */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">Identify Your Carrier</h3>
                <p className="text-sm text-slate-500">Let's pull up your authority data.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Super Trucking LLC"
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">DOT Number</label>
                  <input 
                    type="number" 
                    placeholder="1234567"
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                    value={formData.dotNumber}
                    onChange={(e) => setFormData({...formData, dotNumber: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DRIVER */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
               <div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">Driver Profile</h3>
                <p className="text-sm text-slate-500">Experience unlocks better rates.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">CDL Experience</label>
                  <div className="relative">
                    <select 
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium bg-white appearance-none"
                      value={formData.cdlYears}
                      onChange={(e) => setFormData({...formData, cdlYears: e.target.value})}
                    >
                      <option>Less than 1 year</option>
                      <option>1-3 Years</option>
                      <option>3-5 Years</option>
                      <option>5+ Years (Pro)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} />
                  </div>
                </div>
                <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors bg-slate-50">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 text-green-500 rounded focus:ring-green-400"
                    checked={formData.cleanRecord}
                    onChange={(e) => setFormData({...formData, cleanRecord: e.target.checked})}
                  />
                  <span className="text-sm font-bold text-slate-700">Clean driving record <span className="block text-xs font-normal text-slate-500">(Last 3 years)</span></span>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 3: VEHICLE */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
               <div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">The Rig</h3>
                <p className="text-sm text-slate-500">What are we insuring today?</p>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, vehicleType: "Semi"})}
                    className={`p-4 border-2 rounded-xl font-bold text-sm flex flex-col items-center gap-2 transition-all ${formData.vehicleType === 'Semi' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                  >
                    <Truck size={24} />
                    Semi-Truck
                  </button>
                  <button 
                     type="button"
                     onClick={() => setFormData({...formData, vehicleType: "Box"})}
                     className={`p-4 border-2 rounded-xl font-bold text-sm flex flex-col items-center gap-2 transition-all ${formData.vehicleType === 'Box' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="opacity-50"><Truck size={24} /></div>
                    Box Truck
                  </button>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">VIN (Optional)</label>
                   <input 
                    type="text" 
                    placeholder="Enter VIN or Skip"
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                    value={formData.vin}
                    onChange={(e) => setFormData({...formData, vin: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: OPERATIONS */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">Operations</h3>
                <p className="text-sm text-slate-500">Where do you run and what do you haul?</p>
              </div>
               <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Primary Region</label>
                    <div className="relative">
                      <select 
                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium bg-white appearance-none"
                        value={formData.region}
                        onChange={(e) => setFormData({...formData, region: e.target.value})}
                      >
                        <option>Over the Road (OTR - 48 States)</option>
                        <option>Regional (Southwest)</option>
                        <option>Regional (Northeast)</option>
                        <option>Regional (Midwest)</option>
                        <option>Local (&lt; 300 miles)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Cargo Type</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dry Van, Reefer"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                      value={formData.cargo}
                      onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    />
                  </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: LOSS RUN */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">Loss History</h3>
                <p className="text-sm text-slate-500">Last step to unlock your AI Rate.</p>
              </div>
              
              <div className="border-3 border-dashed border-blue-200 rounded-2xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-500">
                    <FileText size={24} />
                  </div>
                  <p className="text-base font-bold text-blue-900">Upload Loss Run Report</p>
                  <p className="text-xs text-slate-500 font-medium">(PDF or Image)</p>
              </div>

              <div className="relative flex items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">OR QUICK SKIP</span>
                  <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <label className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-xl bg-green-50/50 cursor-pointer hover:bg-green-100 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 text-green-600 rounded focus:ring-green-500 border-green-300"
                    checked={formData.cleanLosses}
                    onChange={(e) => setFormData({...formData, cleanLosses: e.target.checked})}
                  />
                  <div>
                      <span className="text-sm font-bold text-green-900">No losses in past 3 years.</span>
                      <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mt-1">+500 XP Bonus</span>
                  </div>
              </label>
            </motion.div>
          )}

        </AnimatePresence>

        {/* CONTROLS */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              disabled={isSubmitting || step === 1}
              className="w-1/3 text-blue-700 font-bold text-lg py-4 rounded-xl shadow-lg transform transition active:scale-95 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={isSubmitting}
              className={`w-2/3 text-white font-bold text-lg py-4 rounded-xl shadow-lg transform transition active:scale-95 flex justify-center items-center gap-3 relative overflow-hidden group ${
                step === totalSteps 
                  ? "bg-green-500 hover:bg-green-400 shadow-green-500/30" 
                  : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
              }`}
            >
              {isSubmitting ? (
                <span>Calculating...</span>
              ) : (
                <>
                  <span className="relative z-10">{step === totalSteps ? "Finish" : "Next"}</span>
                  <ChevronRight size={20} className={`relative z-10 transition-transform ${step !== totalSteps && "group-hover:translate-x-1"}`} />
                </>
              )}
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 font-medium flex items-center justify-center gap-2">
            <ShieldCheck size={12} className="text-green-500" /> 256-bit Secure Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE LAYOUT ---

export default function LandingPage() {
  const scrollToQuote = () => {
    const element = document.getElementById("quote-section");
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <FloatingActions onChat={() => setIsChatOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="text-center md:text-left relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm"
            >
               <Star size={12} fill="currentColor" /> AI-Powered Savings Engine
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight"
            >
              Haul Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Insure Faster.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 mb-8 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Stop overpaying for generic coverage. Our AI analyzes your specific lanes and loads to unlock instant savings tailored to your rig.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button 
                onClick={scrollToQuote}
                className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-green-500/30 transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Unlock the best price <ArrowDown size={20} className="animate-bounce" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center md:justify-start items-center gap-4 text-slate-500 text-sm mt-8 font-medium"
            >
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span>4.9/5 Rating from 10k+ Truckers</span>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop" 
              alt="Modern semi-truck" 
              className="rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 object-cover h-[500px] w-full border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* WIZARD SECTION */}
      <section id="quote-section" className="px-4 py-16 bg-slate-50 relative">
        <div className="text-center mb-12">
             <h2 className="font-bold text-2xl md:text-3xl mb-3 text-slate-900">Start Your Quote Quest</h2>
             <p className="text-slate-500">Complete 5 quick levels to unlock your AI-optimized rate.</p>
        </div>
        
        <QuoteWizard />
        
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/supertruck-logo.svg" alt="Super Truck" fill sizes="32px" className="object-contain" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">Super Truck Insurance</span>
            </div>
            <p className="leading-relaxed text-slate-500">AI-optimized insurance for modern trucking. Haul more, pay less.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Services</h4>
            <a href="#" className="hover:text-white transition-colors">COIsure</a>
            <a href="#" className="hover:text-white transition-colors">Toll Calculator</a>
            <a href="#" className="hover:text-white transition-colors">Permit Tracker</a>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Company</h4>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Agents</h4>
            <a href="/Agent" className="hover:text-white transition-colors">Agent Login / Dashboard</a>
          </div>
        </div>
        <div className="text-center text-slate-600 mt-8">&copy; 2024 SuperTruck.ai Insurance Services. All rights reserved.</div>
      </footer>

      {/* Chat / Inquiry box */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-bold text-slate-800">Contact Super Truck</p>
              <p className="text-xs text-slate-500">We respond within minutes.</p>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600">
              <XCircle size={18} />
            </button>
          </div>
          <div className="space-y-3">
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Name" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email or phone" />
            <textarea className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="How can we help?" />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition">
              Send inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}