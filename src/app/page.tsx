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
  ArrowDown,
  XCircle
} from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';
import QuoteWizard from "../component/quote-wizard";

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


// --- MAIN PAGE LAYOUT ---

export default function LandingPage() {
  const scrollToQuote = () => {
    const element = document.getElementById("quote-section");
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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