import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, ShieldCheck, Clock, LogOut, Mail, FileText, CheckCircle2, MessageSquare, ArrowLeft, Send, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onVerify: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, isOpen, onClose, onLogout, onVerify }) => {
  const [view, setView] = useState<'profile' | 'contact'>('profile');
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setView('profile');
      setFormData({ subject: '', message: '' });
      setIsSent(false);
    }
  }, [isOpen]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[RentLux Admin Message]', {
      user: user.email,
      name: user.name,
      ...formData
    });
    
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ subject: '', message: '' });
      setView('profile');
    }, 3000); // 3 seconds to read success message
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-colors"
          />
          
          {/* Modal */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Header / Cover */}
            <div className="h-32 bg-gradient-to-br from-green-600 to-emerald-800 relative transition-all duration-500 shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              {view === 'contact' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <MessageSquare size={20} /> Contact Support
                    </h3>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="bg-white relative min-h-[420px] flex flex-col">
                <AnimatePresence mode="wait">
                    {view === 'profile' ? (
                        <MotionDiv
                            key="profile"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="px-8 pb-8 -mt-12 relative flex-1 flex flex-col"
                        >
                            {/* Avatar */}
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg">
                                    <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 overflow-hidden relative">
                                        <User size={48} />
                                    </div>
                                    {/* Status Badge on Avatar */}
                                    <div className="absolute bottom-1 right-0">
                                        {user.status === 'verified' ? (
                                            <div className="bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        ) : (
                                            <div className="bg-orange-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Pending Verification">
                                                <Clock size={16} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* User Details */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                                <p className="text-slate-500 text-sm font-medium">{user.status === 'verified' ? 'Verified Tenant' : 'Verification Pending'}</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="bg-white p-2.5 rounded-xl text-slate-400 shadow-sm border border-slate-100">
                                        <Mail size={18} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</div>
                                        <div className="text-sm font-medium text-slate-700 truncate">{user.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="bg-white p-2.5 rounded-xl text-slate-400 shadow-sm border border-slate-100">
                                        <FileText size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">NIN Status</div>
                                        <div className="text-sm font-medium text-slate-700 flex items-center justify-between">
                                            {user.status === 'verified' ? (
                                                <span className="text-green-600 font-bold flex items-center gap-1">
                                                    Approved <ShieldCheck size={14} />
                                                </span>
                                            ) : (
                                                <span className="text-orange-500 font-bold flex items-center gap-1">
                                                    In Review <Clock size={14} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Demo Admin Action */}
                            {user.status === 'pending' && (
                                <div className="mb-6 bg-orange-50 border border-orange-100 p-3 rounded-xl">
                                    <div className="flex items-start gap-2 mb-2">
                                        <Shield size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-orange-700 leading-tight">
                                            <span className="font-bold">Admin Demo:</span> Your NIN is currently under review. Click below to simulate admin verification.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={onVerify}
                                        className="w-full py-2 bg-orange-200 hover:bg-orange-300 text-orange-800 text-xs font-bold rounded-lg transition-colors"
                                    >
                                        Approve Verification
                                    </button>
                                </div>
                            )}

                            <div className="mt-auto grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setView('contact')}
                                    className="flex items-center justify-center gap-2 text-slate-600 font-bold py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm"
                                >
                                    <MessageSquare size={16} />
                                    Support
                                </button>
                                <button 
                                    onClick={onLogout}
                                    className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors text-sm"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </MotionDiv>
                    ) : (
                        <MotionDiv
                            key="contact"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="p-6 pt-8 h-full flex flex-col"
                        >
                             {isSent ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <MotionDiv 
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring" }}
                                        className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto"
                                    >
                                        <Check size={32} />
                                    </MotionDiv>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 text-sm max-w-[200px] mx-auto leading-relaxed">
                                        Our admin team will review your message and reply via email shortly.
                                    </p>
                                </div>
                             ) : (
                                <form onSubmit={handleContactSubmit} className="flex flex-col h-full">
                                    <button 
                                        type="button"
                                        onClick={() => setView('profile')}
                                        className="self-start flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 mb-4 uppercase tracking-wide"
                                    >
                                        <ArrowLeft size={14} /> Back to Profile
                                    </button>

                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject</label>
                                            <input 
                                                type="text" 
                                                required
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-sm"
                                                placeholder="e.g. Verification Issue"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
                                            <textarea 
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-sm resize-none"
                                                placeholder="Describe your issue or inquiry..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button 
                                            type="submit"
                                            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            Send Message <Send size={16} />
                                        </button>
                                    </div>
                                </form>
                             )}
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};