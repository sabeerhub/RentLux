import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { X, MapPin, CheckCircle, Phone, Shield, Check, Star, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'confirm' | 'success'>('idle');

  // Reset booking status when property changes (though component usually remounts)
  useEffect(() => {
    setBookingStatus('idle');
  }, [property]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);
  };

  const handleBookClick = () => {
    setBookingStatus('confirm');
  };

  const confirmBooking = () => {
    console.log(`[RentLux] Booking confirmed for property: ${property.title} (ID: ${property.id})`);
    setBookingStatus('success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-colors"
      />
      
      {/* Modal Container */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[85vh] md:h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
      >
        {/* Close Button (Floating) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[70] bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-md transition-all shadow-sm group"
        >
          <X size={20} className="text-slate-500 group-hover:text-slate-900" />
        </button>

        {/* --- CONFIRMATION OVERLAYS --- */}
        <AnimatePresence>
          {bookingStatus === 'confirm' && (
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-white/95 backdrop-blur-md flex items-center justify-center p-6"
            >
              <MotionDiv 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full text-center p-4"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                  <Shield size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Inspect?</h3>
                <p className="text-slate-500 mb-8 text-base leading-relaxed">
                  You are requesting an inspection for <span className="font-bold text-slate-800">{property.title}</span>. 
                  Our verified agent will contact you to schedule a time.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setBookingStatus('idle')}
                    className="py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmBooking}
                    className="py-3.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                  >
                    Confirm Booking
                  </button>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}

          {bookingStatus === 'success' && (
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-green-600 flex items-center justify-center p-6 text-white"
            >
              <MotionDiv 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center max-w-sm"
              >
                <MotionDiv 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
                  className="w-24 h-24 bg-white text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <Check size={48} strokeWidth={4} />
                </MotionDiv>
                <h3 className="text-3xl font-bold mb-4">Request Sent!</h3>
                <p className="text-green-100 mb-8 text-lg leading-relaxed">
                  We've notified the agent. Check your dashboard or email for updates on your inspection schedule.
                </p>
                <button 
                  onClick={() => {
                    setBookingStatus('idle');
                    onClose();
                  }}
                  className="w-full bg-white text-green-700 font-bold py-4 px-8 rounded-2xl hover:bg-green-50 transition-all shadow-xl active:scale-95"
                >
                  Back to Browsing
                </button>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>


        {/* --- MAIN SPLIT LAYOUT --- */}
        
        {/* LEFT: Immersive Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative bg-slate-200 shrink-0">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:opacity-40" />
          
          {/* Image Overlays */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm">
              {property.type}
            </span>
            <span className="bg-green-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Star size={12} fill="currentColor" /> {property.rating}
            </span>
          </div>
        </div>

        {/* RIGHT: Content Scrollable Area */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-white relative">
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            
            {/* Header Info */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                {property.title}
              </h2>
              <div className="flex items-center text-slate-500 font-medium">
                <MapPin size={18} className="mr-1.5 text-green-600" />
                {property.location}, {property.city}
              </div>
            </div>

            {/* Price Block */}
            <div className="flex items-end gap-2 mb-8 pb-6 border-b border-slate-100">
              <span className="text-3xl md:text-4xl font-bold text-green-600 tracking-tight">
                {formatPrice(property.price)}
              </span>
              <span className="text-sm text-slate-400 font-medium mb-2">/ annum</span>
            </div>

            {/* Agent Card */}
            <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                AG
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">Agent Gbenga</div>
                <div className="text-xs text-green-600 flex items-center gap-1 font-medium">
                  Verified Partner <CheckCircle size={12} />
                </div>
              </div>
              <button className="bg-white hover:bg-green-50 text-slate-400 hover:text-green-600 p-2.5 rounded-xl border border-slate-200 transition-colors">
                <Phone size={18} />
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">About Property</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {property.description}
              </p>
              {property.proximity && (
                <div className="mt-4 flex items-start gap-3 bg-blue-50/80 p-3 rounded-xl text-blue-800 text-sm border border-blue-100">
                  <Info size={18} className="shrink-0 mt-0.5" />
                  <span><strong>Proximity:</strong> {property.proximity}</span>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-white md:bg-white/80 md:backdrop-blur-xl z-10 shrink-0">
            <button 
              onClick={handleBookClick}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 rounded-xl shadow-xl shadow-slate-200/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Calendar size={20} />
              Book Inspection
            </button>
            <div className="text-center mt-3">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Shield size={10} /> 100% Secure Booking
              </span>
            </div>
          </div>

        </div>
      </MotionDiv>
    </div>
  );
};