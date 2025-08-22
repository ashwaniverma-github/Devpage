'use client'
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { motion } from 'framer-motion'
import { Code, ArrowRight, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Signin(){
    const router = useRouter()
    const {data:session,status} = useSession()

    if(status=='loading'){
        return <Loading/>
    }

    if(status=='authenticated'){
        router.push('/dashboard')
        return null
    }

    const handleSignin = ()=>{
        signIn('google',{callbackUrl:'/dashboard'})
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                        <Code className="h-8 w-8 text-gray-300" />
                        <span className="text-2xl font-bold">Devpage</span>
                    </Link>
                </div>

                {/* Sign In Card */}
                <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-gray-800 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Builder</h1>
                        <p className="text-gray-400">Ready to showcase your portfolio to the world?</p>
                    </div>

                    <Button 
                        onClick={handleSignin}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-semibold py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-lg"
                    >
                        <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-3" />
                        Continue with Google
                        <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-gray-300 hover:text-white underline">
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 text-center">
                    <div className="flex justify-center space-x-6 text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">
                            <Github className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Twitter className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}