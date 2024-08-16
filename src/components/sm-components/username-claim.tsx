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
        <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-900 text-gray-300 rounded-md px-4 py-2">
                <span className="text-white">devpage.in/</span>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="yourname"
                    className="bg-transparent outline-none text-gray-400 ml-1"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-800 text-white font-semibold px-2 py-2 rounded-md hover:bg-blue-600"
            >
                Claim
            </button>
            {availability && <p className=" ml-2 font-semibold ">{availability}</p>}
        </div>
    );
}
