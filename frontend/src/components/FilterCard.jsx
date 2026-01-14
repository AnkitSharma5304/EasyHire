import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Banknote, Filter, X } from 'lucide-react';

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    icon: Banknote,
    array: ["5 - 10 LPA", "10 - 30 LPA", "30 - 60 LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilters = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-tropical-teal/10 rounded-lg text-tropical-teal">
                <Filter size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Filter Jobs</h2>
        </div>
        
        <AnimatePresence>
            {selectedValue && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearFilters}
                    className="text-xs font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 border border-red-100"
                >
                    Clear <X size={12} />
                </motion.button>
            )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0 group">
              
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-4">
                 <section.icon size={18} className="text-gray-400 group-hover:text-tropical-teal transition-colors" />
                 <h3 className="text-lg font-bold text-gray-800">{section.filterType}</h3>
              </div>

              {/* Options */}
              <div className="space-y-3 pl-1">
                {section.array.map((item, idx) => {
                  const id = `radio-${index}-${idx}`;
                  const isSelected = selectedValue === item;

                  return (
                    <motion.div
                      key={id}
                      whileHover={{ x: 4 }}
                      className={`relative flex items-center p-2 rounded-lg transition-all duration-200 ${isSelected ? 'bg-tropical-teal/5' : 'hover:bg-gray-50'}`}
                    >
                      <RadioGroupItem
                        id={id}
                        value={item}
                        className={`peer w-5 h-5 border-2 rounded-full transition-all duration-300 ${isSelected ? 'border-tropical-teal text-tropical-teal' : 'border-gray-300 text-transparent'}`}
                      />
                      <Label
                        htmlFor={id}
                        className={`ml-3 text-sm cursor-pointer select-none flex-1 font-medium transition-colors ${isSelected ? 'text-tropical-teal' : 'text-gray-600'}`}
                      >
                        {item}
                      </Label>
                      
                      {/* Active Indicator Dot (Optional Visual Flair) */}
                      {isSelected && (
                        <motion.div 
                            layoutId="active-dot"
                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-tropical-teal" 
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Divider (except last item) */}
              {index !== filterData.length - 1 && (
                <div className="mt-6 border-b border-dashed border-gray-200" />
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </motion.div>
  );
};

export default FilterCard;