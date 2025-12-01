import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PROPERTIES, PROPERTY_TYPES } from './constants';
import { Property, FilterState, UserProfile } from './types';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { ChatWidget } from './components/ChatWidget';
import { ProfileModal } from './components/ProfileModal';
import { Search, SlidersHorizontal, MapPin, Home, GraduationCap, Key, ArrowRight, Lock, Mail, User, ShieldCheck, LockOpen, Upload, FileText, CheckCircle2, Clock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionP = motion.p as any;

// --- AuthGate Component (Professional Animation & Login) ---

const AuthGate = ({ onLogin }: { onLogin: (user: UserProfile) => void }) => {
  const [phase, setPhase] = useState<'locked' | 'unlocking' | 'opening' | 'revealed'>('locked');
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nin: '',
    ninFile: null as File | null
  });

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Key Enters (handled by initial render animation)
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 2: Key Turns & Unlocks
      setPhase('unlocking');
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 3: Doors Open
      setPhase('opening');
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 4: Show Auth Form
      setPhase('revealed');
    };

    sequence();
  }, []);

  // Auth Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate Auth Logic
    if (isLoginView) {
        // Login matches an existing "Verified" user
        onLogin({
            name: 'Ibrahim Musa',
            email: formData.email || 'student@fud.edu.ng',
            status: 'verified'
        });
    } else {
        // Signup creates a "Pending" user awaiting admin NIN verification
        onLogin({
            name: formData.name || 'New User',
            email: formData.email,
            status: 'pending'
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, ninFile: e.target.files[0] });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-hidden flex items-center justify-center z-50">
      
      {/* BACKGROUND LAYER (The Beautiful House) */}
      <div className="absolute inset-0 z-0">
        <MotionImg 
          src="https://images.unsplash.com/photo-1600596542815-2a4d9f032291?auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Home" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={phase === 'revealed' ? { scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* DOOR LAYERS (The Animation) */}
      <AnimatePresence>
        {phase !== 'revealed' && phase !== 'opening' && (
           // While locked or unlocking, show the solid doors and lock mechanism
           null
        )}
      </AnimatePresence>

      {/* Left Door Panel */}
      <MotionDiv 
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#0f291e] border-r border-[#1a4031] z-40 flex items-center justify-end pr-1 shadow-2xl"
        initial={{ x: 0 }}
        animate={phase === 'opening' || phase === 'revealed' ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute inset-y-0 right-8 w-px bg-white/5"></div>
      </MotionDiv>

      {/* Right Door Panel */}
      <MotionDiv 
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#0f291e] border-l border-[#1a4031] z-40 flex items-center justify-start pl-1 shadow-2xl"
        initial={{ x: 0 }}
        animate={phase === 'opening' || phase === 'revealed' ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute inset-y-0 left-8 w-px bg-white/5"></div>
      </MotionDiv>

      {/* LOCK MECHANISM (Centered) */}
      <MotionDiv 
        className="absolute z-50 flex flex-col items-center justify-center"
        animate={phase === 'opening' || phase === 'revealed' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* The Lock Body */}
            <MotionDiv
                className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl ring-1 ring-white/10"
            >
                {phase === 'locked' ? (
                   <Lock size={48} className="text-white/80" />
                ) : (
                   <LockOpen size={48} className="text-green-400" />
                )}
            </MotionDiv>

            {/* The Key */}
            <MotionDiv
                className="absolute z-20 text-amber-400 drop-shadow-lg"
                initial={{ x: 60, y: 60, opacity: 0, rotate: 45 }}
                animate={
                    phase === 'locked' 
                    ? { x: [60, 10, 0], y: [60, 10, 0], opacity: 1, rotate: 45 } 
                    : phase === 'unlocking'
                    ? { x: 0, y: 0, opacity: 1, rotate: 135 } // Turn key
                    : { opacity: 0 }
                }
                transition={
                    phase === 'locked' 
                    ? { duration: 0.8, ease: "backOut", delay: 0.2 }
                    : { duration: 0.5, ease: "easeInOut" }
                }
            >
                <Key size={56} fill="currentColor" />
            </MotionDiv>

            {/* Glow Effect on Unlock */}
            {phase === 'unlocking' && (
                <MotionDiv 
                    className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
        
        <MotionP 
            className="mt-8 text-green-100/50 text-sm font-light tracking-[0.3em] uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            {phase === 'locked' ? 'Secure Access' : 'Access Granted'}
        </MotionP>
      </MotionDiv>


      {/* AUTH CARD (Appears after open) */}
      {phase === 'revealed' && (
        <MotionDiv 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="z-40 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Decorative sheen */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                
                <div className="text-center mb-6">
                    <MotionDiv 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl mb-3 shadow-lg shadow-green-600/30"
                    >
                        <Home className="text-white" size={28} />
                    </MotionDiv>
                    <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
                        Rent<span className="text-green-400">Lux</span>
                    </h2>
                    <p className="text-green-100/70 text-sm">
                        {isLoginView ? 'Welcome back, Scholar!' : 'Join the exclusive Dutse community.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {!isLoginView && (
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all backdrop-blur-sm text-sm"
                                required={!isLoginView}
                            />
                        </div>
                    )}
                    
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all backdrop-blur-sm text-sm"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all backdrop-blur-sm text-sm"
                            required
                        />
                    </div>

                    {!isLoginView && (
                      <div className="space-y-3 pt-2">
                         <div className="relative group">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="NIN Number (11 Digits)"
                                maxLength={11}
                                pattern="\d{11}"
                                value={formData.nin}
                                onChange={(e) => setFormData({...formData, nin: e.target.value})}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all backdrop-blur-sm text-sm"
                                required={!isLoginView}
                            />
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="file" 
                            id="nin-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required={!isLoginView}
                          />
                          <label 
                            htmlFor="nin-upload"
                            className={`w-full flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${formData.ninFile ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                          >
                            {formData.ninFile ? (
                              <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle2 size={20} />
                                <span className="text-xs font-medium truncate max-w-[200px]">{formData.ninFile.name}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1 text-white/40">
                                <Upload size={20} />
                                <span className="text-xs">Upload NIN Card</span>
                              </div>
                            )}
                          </label>
                        </div>
                        <p className="text-[10px] text-white/40 text-center px-4">
                          *Admin verification required for all new accounts.
                        </p>
                      </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-900/50 active:scale-95 flex items-center justify-center gap-2 group mt-4"
                    >
                        {isLoginView ? 'Unlock Dashboard' : 'Submit for Verification'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60 text-xs">
                        {isLoginView ? "New to RentLux?" : "Already verified?"}{' '}
                        <button 
                            onClick={() => setIsLoginView(!isLoginView)}
                            className="text-white font-bold hover:text-green-300 transition-colors"
                        >
                            {isLoginView ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
                <ShieldCheck size={14} />
                <span>Verified Residents Only • Dutse, Jigawa</span>
            </div>
        </MotionDiv>
      )}
    </div>
  );
};

// --- Dashboard Component (Main App Logic) ---

const Dashboard = ({ 
  user, 
  onLogout,
  onVerify 
}: { 
  user: UserProfile, 
  onLogout: () => void,
  onVerify: () => void 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: 0,
    maxPrice: 5000000,
    type: null,
    city: 'Dutse'
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                          p.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesType = filters.type ? p.type === filters.type : true;
      const matchesCity = filters.city ? p.city === filters.city : true;
      const matchesPrice = p.price <= filters.maxPrice;

      return matchesSearch && matchesType && matchesCity && matchesPrice;
    });
  }, [filters]);

  const handleNavClick = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setIsMobileMenuOpen(false); // Close mobile menu if open
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      
      {/* Floating Modern Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 pointer-events-none">
        <nav className={`
            pointer-events-auto mx-auto max-w-7xl transition-all duration-300 ease-in-out
            ${isScrolled 
                ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 rounded-2xl py-3 px-6' 
                : 'bg-transparent py-4 px-4'}
        `}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleNavClick('')}
            >
              <div className="bg-green-600 p-2 rounded-xl text-white shadow-lg shadow-green-600/20">
                <Home size={20} strokeWidth={2.5} />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                Rent<span className="text-green-600">Lux</span>
              </span>
            </div>

            {/* Desktop Links (Functional) */}
            <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isScrolled ? 'text-slate-600' : 'text-slate-600'} bg-white/50 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/20 shadow-sm`}>
              <button onClick={() => handleNavClick('FUD')} className="hover:text-green-600 transition-colors">FUD Lodges</button>
              <button onClick={() => handleNavClick('Corpers')} className="hover:text-green-600 transition-colors">Corpers Lodge</button>
              <button onClick={() => handleNavClick('Takur')} className="hover:text-green-600 transition-colors">Takur Listings</button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
               <div 
                 className={`flex items-center gap-3 pl-1 pr-1.5 py-1 rounded-full border transition-all cursor-pointer hover:shadow-md ${isScrolled ? 'bg-white border-slate-100' : 'bg-white/80 backdrop-blur-md border-white/40'}`}
                 onClick={() => setIsProfileOpen(true)}
               >
                 <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 overflow-hidden relative">
                    <User size={18} />
                 </div>
                 <div className="hidden sm:block text-right pr-2">
                    <div className="text-xs font-bold text-slate-900 leading-tight">{user.name}</div>
                    <div className="text-[10px] font-medium flex items-center justify-end gap-1">
                        {user.status === 'verified' ? (
                            <>
                                <span className="text-blue-500">Verified</span>
                                <div className="bg-blue-500 text-white rounded-full p-[1px]">
                                    <CheckCircle2 size={10} />
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="text-orange-500">Pending</span>
                                <Clock size={10} className="text-orange-500" />
                            </>
                        )}
                    </div>
                 </div>
               </div>
               
               {/* Mobile Menu Toggle */}
               <button 
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="md:hidden p-2.5 bg-white rounded-xl shadow-sm text-slate-600 hover:text-green-600 transition-colors"
               >
                  <Menu size={20} />
               </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 p-2 rounded-xl text-white">
                    <Home size={20} />
                  </div>
                  <span className="text-xl font-bold">Rent<span className="text-green-600">Lux</span></span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 p-6 space-y-6">
                 <div className="space-y-4">
                    <button onClick={() => handleNavClick('FUD')} className="w-full text-left text-lg font-bold text-slate-700 hover:text-green-600 py-2 border-b border-slate-50">FUD Lodges</button>
                    <button onClick={() => handleNavClick('Corpers')} className="w-full text-left text-lg font-bold text-slate-700 hover:text-green-600 py-2 border-b border-slate-50">Corpers Lodge</button>
                    <button onClick={() => handleNavClick('Takur')} className="w-full text-left text-lg font-bold text-slate-700 hover:text-green-600 py-2 border-b border-slate-50">Takur Listings</button>
                 </div>

                 <div className="pt-8">
                   <button 
                     onClick={() => { setIsMobileMenuOpen(false); setIsProfileOpen(true); }}
                     className="flex items-center gap-3 w-full p-4 bg-slate-50 rounded-2xl"
                   >
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm">
                       <User size={20} />
                     </div>
                     <div className="text-left">
                       <div className="font-bold text-slate-900">{user.name}</div>
                       <div className="text-xs text-slate-500">View Profile</div>
                     </div>
                   </button>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 text-center text-slate-400 text-xs">
                 &copy; 2024 RentLux Jigawa
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-green-50 via-white to-transparent -z-10" />
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 left-[10%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

        <div className="container mx-auto text-center max-w-4xl mt-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 px-4 py-1.5 rounded-full text-green-700 text-sm font-semibold mb-6 shadow-sm">
              <GraduationCap size={16} />
              <span>Exclusive for Dutse, Jigawa State</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Best student housing in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Dutse & Jigawa</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Secure, verified, and affordable accommodation near FUD, Poly, and NYSC Secretariat.
            </p>
          </MotionDiv>

          {/* Search Bar */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 max-w-3xl mx-auto border border-slate-100 flex flex-col md:flex-row gap-2 relative z-10"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <Search className="text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by area (e.g. Takur, Gida Dubu, FUD)..."
                className="bg-transparent w-full outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:w-auto">
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-slate-100 border border-slate-100 text-slate-500 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-not-allowed"
                    disabled
                    value="Dutse"
                  >
                    <option value="Dutse">Dutse Only</option>
                  </select>
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-slate-50 border border-slate-100 text-slate-700 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 cursor-pointer"
                    onChange={(e) => setFilters({...filters, type: e.target.value || null})}
                  >
                    <option value="">Any Type</option>
                    {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95">
              Search
            </button>
          </MotionDiv>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-slate-900">Latest in Dutse</h2>
           <span className="text-sm font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
             {filteredProperties.length} found
           </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onViewDetails={setSelectedProperty} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
             <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="text-slate-300" size={32} />
             </div>
             <h3 className="text-lg font-bold text-slate-900">No properties found</h3>
             <p className="text-slate-500">Try adjusting your filters to see more results in Dutse.</p>
             <button 
               onClick={() => setFilters({search: '', minPrice: 0, maxPrice: 5000000, type: null, city: 'Dutse'})}
               className="mt-4 text-green-600 font-semibold hover:underline"
             >
               Clear all filters
             </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-1.5 rounded-lg text-white">
                <Home size={18} />
              </div>
              <span className="text-lg font-bold text-slate-900">RentLux</span>
            </div>
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} RentLux Jigawa. Connecting FUD students & Corpers to homes.
            </div>
            <div className="flex gap-6 text-slate-400">
               <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
               <a href="#" className="hover:text-slate-600 transition-colors">Instagram</a>
               <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            key="property-modal"
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
      <ProfileModal 
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={onLogout}
        onVerify={onVerify}
      />
      <ChatWidget />
      
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('rentlux_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to load user from local storage", e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rentlux_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rentlux_user');
    }
  }, [user]);

  if (!user) {
    return <AuthGate onLogin={setUser} />;
  }

  const handleVerifyUser = () => {
    setUser((prev) => prev ? { ...prev, status: 'verified' } : null);
  };

  return <Dashboard user={user} onLogout={() => setUser(null)} onVerify={handleVerifyUser} />;
}

export default App;