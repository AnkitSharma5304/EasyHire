import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Database, 
  Palette, 
  Layers, 
  Server, 
  Smartphone, 
  Briefcase 
} from 'lucide-react';

const categories = [
  { name: "Frontend Developer", icon: Code2 },
  { name: "Backend Developer", icon: Server },
  { name: "Data Scientist", icon: Database },
  { name: "UI/UX Designer", icon: Palette },
  { name: "Full Stack Developer", icon: Layers },
  { name: "DevOps Engineer", icon: Terminal },
  { name: "Mobile App Developer", icon: Smartphone },
  { name: "Product Manager", icon: Briefcase }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-20 relative overflow-hidden bg-soft-linen/30">
      {/* Subtle Background Gradient for Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tropical-teal/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="relative text-center mb-16 px-4">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-tropical-teal">Explore Popular</span> Jobs
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover opportunities across top tech domains. Click a category to get started.
        </motion.p>
      </div>

      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl mx-auto px-8 md:px-12"
      >
        <CarouselContent className="-ml-4 pb-4">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Button
                  onClick={() => searchJobHandler(cat.name)}
                  variant="outline"
                  className="group relative w-full h-[140px] flex flex-col items-center justify-center gap-4 rounded-2xl bg-white border border-ash-grey/50 hover:border-tropical-teal transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover Background Fill Effect */}
                  <div className="absolute inset-0 bg-tropical-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon with Animation */}
                  <div className="p-3 rounded-full bg-soft-linen/50 text-tropical-teal group-hover:scale-110 group-hover:bg-tropical-teal group-hover:text-white transition-all duration-300 z-10">
                    <cat.icon size={28} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <span className="text-base font-semibold text-gray-700 group-hover:text-tropical-teal transition-colors z-10">
                    {cat.name}
                  </span>
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation Buttons */}
        <CarouselPrevious className="hidden md:flex -left-4 w-12 h-12 bg-white hover:bg-tropical-teal hover:text-white border-ash-grey shadow-lg" />
        <CarouselNext className="hidden md:flex -right-4 w-12 h-12 bg-white hover:bg-tropical-teal hover:text-white border-ash-grey shadow-lg" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;