import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Loader } from 'lucide-react';
import {motion} from 'framer-motion'



const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

export default function UsernameInput() {
    const [username, setUsername] = useState('');
    const [availability, setAvailability] = useState<string | null>(null);
    const {toast} = useToast()
    const[claiming,setClaiming] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async () => {
        if (!username.trim()) {
            setAvailability('Username cannot be empty');
            toast({ variant: 'destructive', description: 'Username cannot be empty' });
            return;
        }
    
        try {
            setClaiming(true);
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setAvailability('Username updated successfully');
                toast({ description: 'Click on Save' });
            } else {
                setAvailability(data.error);
                toast({ variant: 'destructive', description: 'Not available' });
            }
        } catch (error) {
            console.error('Error:', error);
            setAvailability('An error occurred');
        } finally {
            setClaiming(false);
        }
    };
    

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center bg-gray-900 text-gray-300 rounded-md px-4 py-2 w-full sm:w-auto">
                <span className="text-white">devpage.in/</span>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="yourname"
                    className="bg-transparent outline-none text-gray-400 ml-1 w-full"
                />
            </div>
            <motion.div variants={buttonVariants} whileHover={'hover'} className=' w-28 sm:w-auto'>
                <button
                    onClick={handleSubmit}
                    disabled={claiming}
                    className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 w-full sm:w-auto">
                    {claiming?(
                        <Loader className=' animate-spin ' />
                    ):(
                        'Claim'
                    )}

                </button>
            </motion.div>
            {availability && <p className="font-semibold w-full sm:w-auto text-center sm:text-left">{availability}</p>}
        </div>
    )}