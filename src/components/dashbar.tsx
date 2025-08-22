'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Palette, FileText, LogOut, Play, Code, Eye } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

interface DashbarProps {
    onNavigate: (componentName: string) => void;
    onClick: () => void;
}

export default function Dashbar({ onNavigate, onClick }: DashbarProps) {
    const router = useRouter()
    const { data: session } = useSession()
    const [username, setUsername] = useState<string | null>(null)
    const [isLoadingUsername, setIsLoadingUsername] = useState(false)
    const pageUrl = process.env.PAGE_URL || ""

    const fetchUsername = useCallback(async () => {
        try {
            setIsLoadingUsername(true)
            const email = session?.user?.email
            const response = await fetch('/api/get-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                const data = await response.json()
                setUsername(data.username)
            } else {
                console.error('Failed to fetch username')
            }
        } catch (error) {
            console.error('Error fetching username:', error)
        } finally {
            setIsLoadingUsername(false)
        }
    }, [session])

    useEffect(() => {
        if (session?.user?.email) {
            fetchUsername()
        }
    }, [session, fetchUsername])

    const handleViewPage = async () => {
        if (username) {
            // Open portfolio page in new tab
            window.open(`${pageUrl}/${username}`, '_blank')
        } else {
            // If username not available, try to fetch it first
            await fetchUsername()
            if (username) {
                window.open(`${pageUrl}/${username}`, '_blank')
            }
        }
    }

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push('/')
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-gray-800 z-50">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Code className="h-8 w-8 text-gray-300" />
                        <span className="text-2xl font-bold text-white">Devpage</span>
                    </div>
                    
                    <nav className="flex space-x-2">
                        <Button
                            variant="ghost"
                            onClick={() => onNavigate('page')}
                            className="flex items-center space-x-2 text-white hover:bg-gray-800 hover:text-gray-300 transition-all"
                        >
                            <FileText className="h-4 w-4" />
                            <span>Portfolio</span>
                        </Button>
                        
                        <Button
                            variant="ghost"
                            onClick={() => onNavigate('style')}
                            className="flex items-center space-x-2 text-white hover:bg-gray-800 hover:text-gray-300 transition-all"
                        >
                            <Palette className="h-4 w-4" />
                            <span>Style</span>
                        </Button>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        onClick={handleViewPage}
                        disabled={isLoadingUsername}
                        className="bg-gray-800 hover:bg-gray-700 text-white flex items-center space-x-2 shadow-lg hover:shadow-gray-500/25 transition-all border border-gray-600 disabled:opacity-50"
                    >
                        {isLoadingUsername ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        <span>{isLoadingUsername ? 'Loading...' : 'View Page'}</span>
                    </Button>
                    
                    
                    <Button
                        onClick={handleSignOut}
                        className="flex items-center hover:bg-gray-700 space-x-2 border-gray-600  bg-gray-800 text-white transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}