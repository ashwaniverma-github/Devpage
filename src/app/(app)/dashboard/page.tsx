'use client'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dashbar from '@/components/dashbar'
import CreatePage from '@/components/createPage'
import Style from '@/components/Style'
import Loading from '@/app/loading'

export default function Dashboard() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [activeComponent, setActiveComponent] = useState<string | null>('page')
    const [iframeSrc, setIframeSrc] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'loading') {
            return
        }

        if (!session) {
            router.push('/')
            return
        }

        // Initial fetch of the username when the component mounts
        const fetchUsername = async () => {
            try {
                const email = session.user?.email
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
            }
        }

        fetchUsername()
    }, [session, status, router])

    const handleDeploy = async () => {
        try {
            // Fetch the username each time the deploy button is clicked
            const email = session?.user?.email
            const response = await fetch('/api/get-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                const data = await response.json()
                setUsername(data.username)

                const timestamp = new Date().getTime()
                setIframeSrc(`https://www.devpage.in/${data.username}?timestamp=${timestamp}`)
            } else {
                console.error('Failed to fetch username')
            }
        } catch (error) {
            console.error('Error fetching username:', error)
        }
    }

    const handleNavigation = (componentName: string) => {
        setActiveComponent(componentName)
    }

    if (status === 'loading') {
        return <Loading />
    }

    if (!session) {
        return null
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Dashbar onNavigate={handleNavigation} onClick={handleDeploy} />
            <div className="flex flex-grow mt-28">
                <div className="flex-grow overflow-auto">
                    {activeComponent === 'page' && <CreatePage />}
                    {activeComponent === 'style' && <Style />}
                </div>
                <div className="hidden lg:block fixed top-20 mt-2 right-40 ">
                    <div className="mockup-phone size-90 ">
                        <div className="camera"></div>
                        <div className="display">
                            <div className="artboard artboard-demo phone-1">
                                {iframeSrc?(
                                    <iframe src={iframeSrc} className="w-full h-full" />
                                ):(
                                    <span>Deploy to view </span>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
