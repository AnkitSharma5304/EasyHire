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

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Product Manager"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 relative overflow-hidden bg-soft-linen">
      <div className="absolute inset-0 bg-soft-linen"></div>
      
      <div className="relative text-center mb-12">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-tropical-teal">Explore Popular</span> Categories
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-2 text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Click a category to explore jobs that fit your passion
        </motion.p>
      </div>

      <Carousel className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative">
        <CarouselContent className="flex gap-4">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full text-gray-700 font-semibold px-6 py-4 rounded-xl bg-white border-2 border-ash-grey hover:bg-tropical-teal hover:text-white hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl text-sm md:text-base whitespace-nowrap"
                >
                  {cat}
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 bg-white border-2 border-ash-grey text-tropical-teal hover:bg-tropical-teal hover:text-white hover:border-tropical-teal transition-all shadow-lg" />
        <CarouselNext className="right-0 bg-white border-2 border-ash-grey text-tropical-teal hover:bg-tropical-teal hover:text-white hover:border-tropical-teal transition-all shadow-lg" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
