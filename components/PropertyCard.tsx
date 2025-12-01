import React from 'react';
import { Property } from '../types';
import { MapPin, Star, Zap, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <MotionDiv 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, shadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer group flex flex-col h-full"
      onClick={() => onViewDetails(property)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm uppercase tracking-wider">
          {property.type}
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold">{property.rating}</span>
          </div>
          {property.proximity && (
             <div className="text-[10px] font-medium text-white bg-green-600/90 backdrop-blur-md px-2 py-1 rounded-lg truncate max-w-[60%]">
               {property.proximity}
             </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-green-600 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-slate-500 text-sm mt-1.5">
              <MapPin size={14} className="mr-1 text-green-500 shrink-0" />
              <span className="truncate">{property.location}, {property.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mt-2">
          {property.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] px-2.5 py-1 bg-slate-50 text-slate-600 rounded-full font-medium border border-slate-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-green-600">{formatPrice(property.price)}</span>
            <span className="text-xs text-slate-400 ml-1">/yr</span>
          </div>
          <button className="bg-green-50 text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors">
            <Zap size={18} />
          </button>
        </div>
      </div>
    </MotionDiv>
  );
};