import React, { useState } from 'react';

export default function UsernameInput() {
    const [username, setUsername] = useState('');
    const [availability, setAvailability] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async () => {
        try {
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
            } else {
                setAvailability(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setAvailability('An error occurred');
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
            <div className=' w-28 sm:w-auto'>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-800 text-white font-semibold px-2 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
                >
                    Claim
                </button>
            </div>
            {availability && <p className="font-semibold w-full sm:w-auto text-center sm:text-left">{availability}</p>}
        </div>
    )}