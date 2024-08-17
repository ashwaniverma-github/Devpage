import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const showcaseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function ClaimShowcase() {
    const [userName, setUsername] = useState('');

    return (
        <motion.div 
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"
            variants={showcaseVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex  justify-center md:mr-10 items-center bg-gray-900 text-gray-300 rounded-md px-4 py-2 w-full sm:w-auto">
                <span className="text-white">devpage.in/</span>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="bg-transparent md:mr-28 outline-none p-1 text-gray-400 ml-1 w-full"
                />
            </div>
            <div className='py-4  sm:w-auto'>
                <Link href={'/signin'} passHref>
                    <motion.button
                        className="bg-blue-800 text-white  font-semibold p-3 rounded-md hover:bg-blue-600 w-full sm:w-auto flex justify-center items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {'<-'} Claim my devpage
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    )
}
