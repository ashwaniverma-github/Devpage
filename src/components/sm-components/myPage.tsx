import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Mypage() {
    const { data: session, status } = useSession();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'loading') {
            return; // Wait for the session to load
        }

        if (!session) {
            return; // User is not logged in
        }

        const fetchUsername = async () => {
            try {
                const response = await fetch('/api/get-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: session.user?.email })
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, [session, status]); // Add session and status as dependencies

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>You need to be logged in to view this page.</div>;
    }

    return (
        <div>
            {username && (
                <Link href={`http://localhost:3000/${username}`}>
                    <Button className=" bg-blue-400 " > View mypage {'->'}</Button>
                </Link>
            )}
        </div>
    );
}
