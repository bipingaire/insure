import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, Truck, FileText } from 'lucide-react';

const QuoteWizard = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    companyName: '',
    dotNumber: '',
    cdlYears: '3-5 Years',
    cleanRecord: false,
    vehicleType: 'Semi',
    vin: '',
    region: 'Over the Road (OTR - 48 States)',
    cargo: '',
    cleanLosses: true,
  });

  const [state, handleSubmit] = useForm('xpqqrdgq'); // ← Your Formspree ID

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e); // Let Formspree handle submission
  };

  // Show success screen after submit
  if (state.succeeded) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-slate-100 p-8 text-center">
        <ShieldCheck className="mx-auto text-green-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-blue-900 mb-2">Quote Unlocked!</h2>
        <p className="text-slate-600">Rate: $8,500/yr. Check your email.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-600 font-medium"
        >
          Start New Quote
        </button>
      </div>
    );
  }

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-slate-100 overflow-hidden relative z-20">
      {/* Header */}
      <div className="bg-blue-900 p-6 text-white relative overflow-hidden">
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
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Form Wrapper — only submits on Step 5 */}
      <form onSubmit={step === totalSteps ? handleFinalSubmit : (e) => e.preventDefault()}>
        <div className="p-6 md:p-8 min-h-[400px] flex flex-col justify-between relative bg-white">
          <AnimatePresence mode="wait">
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
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Super Trucking LLC"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      DOT Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234567"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                      value={formData.dotNumber}
                      onChange={(e) => setFormData({ ...formData, dotNumber: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

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
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      CDL Experience
                    </label>
                    <div className="relative">
                      <select
                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium bg-white appearance-none"
                        value={formData.cdlYears}
                        onChange={(e) => setFormData({ ...formData, cdlYears: e.target.value })}
                      >
                        <option>Less than 1 year</option>
                        <option>1-3 Years</option>
                        <option>3-5 Years</option>
                        <option>5+ Years (Pro)</option>
                      </select>
                      {/* <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} /> */}
                    </div>
                  </div>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors bg-slate-50">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-green-500 rounded focus:ring-green-400"
                      checked={formData.cleanRecord}
                      onChange={(e) => setFormData({ ...formData, cleanRecord: e.target.checked })}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      Clean driving record{' '}
                      <span className="block text-xs font-normal text-slate-500">(Last 3 years)</span>
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, vehicleType: 'Semi' })}
                      className={`p-4 border-2 rounded-xl font-bold text-sm flex flex-col items-center gap-2 transition-all ${
                        formData.vehicleType === 'Semi'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Truck size={24} />
                      Semi-Truck
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, vehicleType: 'Box' })}
                      className={`p-4 border-2 rounded-xl font-bold text-sm flex flex-col items-center gap-2 transition-all ${
                        formData.vehicleType === 'Box'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <div className="opacity-50"><Truck size={24} /></div>
                      Box Truck
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      VIN (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter VIN or Skip"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                      value={formData.vin}
                      onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

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
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Primary Region
                    </label>
                    <div className="relative">
                      <select
                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium bg-white appearance-none"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
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
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Cargo Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dry Van, Reefer"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-lg font-medium transition-all"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

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
                    onChange={(e) => setFormData({ ...formData, cleanLosses: e.target.checked })}
                  />
                  <div>
                    <span className="text-sm font-bold text-green-900">No losses in past 3 years.</span>
                    <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mt-1">
                      +500 XP Bonus
                    </span>
                  </div>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="px-6 text-blue-700 font-bold text-lg py-2 rounded-xl shadow-lg transform transition active:scale-95 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              >
                Back
              </button>
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 text-white font-bold text-lg py-2 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 transform transition active:scale-95"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-6 text-white font-bold text-lg py-2 rounded-xl shadow-lg bg-green-500 hover:bg-green-400 shadow-green-500/30 transform transition active:scale-95"
                >
                  {state.submitting ? 'Saving...' : 'Unlock Quote'}
                </button>
              )}
            </div>
            <p className="text-center text-xs text-slate-400 mt-6 font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={12} className="text-green-500" /> 256-bit Secure Encryption
            </p>
          </div>
        </div>

        {/* 🔑 CRITICAL: Hidden inputs to send ALL data on submit */}
        <input type="hidden" name="companyName" value={formData.companyName} />
        <input type="hidden" name="dotNumber" value={formData.dotNumber} />
        <input type="hidden" name="cdlYears" value={formData.cdlYears} />
        <input type="hidden" name="cleanRecord" value={formData.cleanRecord ? 'Yes' : 'No'} />
        <input type="hidden" name="vehicleType" value={formData.vehicleType} />
        <input type="hidden" name="vin" value={formData.vin} />
        <input type="hidden" name="region" value={formData.region} />
        <input type="hidden" name="cargo" value={formData.cargo} />
        <input type="hidden" name="cleanLosses" value={formData.cleanLosses ? 'Yes' : 'No'} />
      </form>
    </div>
  );
};

export default QuoteWizard;