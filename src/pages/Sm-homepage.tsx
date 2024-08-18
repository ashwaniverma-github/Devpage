import React from 'react';
import ClaimShowcase from "@/components/sm-components/claim-showcase";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Mypage from '@/components/sm-components/myPage';

const pageUrl = process.env.PAGE_URL

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const headingVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function SmHomepage() {
  const paragraphText = "Build and share a sleek, one-page portfolio that connects your projects, skills, and social links effortlessly.";

  return (
    <div className="flex pt-20 flex-col justify-center items-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        <motion.h1 
          className="text-6xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          style={{ wordSpacing: '20px', lineHeight: '70px' }}
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Build your <br/> Devpage
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl font-medium text-base-content/80 max-w-2xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {paragraphText.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              style={{ wordSpacing: '5px', lineHeight: '40px' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        <div className='flex justify-center'>
            <ClaimShowcase />
        </div>
        
      </div>
      <h2 className="text-2xl font-bold">Like this One</h2>
      <div className="flex justify-center mt-12">
        <div className="mockup-phone border-primary w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard  artboard-demo phone-1  flex items-center justify-center overflow-hidden">
              <iframe 
                src={`${pageUrl}/elonmusk`} 
                className="w-full h-full  mr-7 sm:mr-0 overflow-hidden "
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Link href={'/signin'}>
        <motion.div 
          
          variants={buttonVariants}
          whileHover="hover"
        >
          <Button className="p-10 text-xl rounded-full my-20" >Build One For Me</Button>
        </motion.div>
      </Link>
      
    </div>
  );
}
