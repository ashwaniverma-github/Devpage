'use client'
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Signin(){
    const handleSignin = ()=>{
        signIn('google',{callbackUrl:'/dashboard'})
    }
    return <div>
        <div className="flex justify-center min-h-screen items-center sm:px-0" >
            <div className=" flex flex-col justify-center items-center rounded-2xl p-10 sm:p-20 bg-stone-100 shadow-2xl space-y-4 mx-w-md ">
                <h2 className="text-xl font-bold ">Welcome to devpage</h2>
                <Button className=" rounded-xl " onClick={handleSignin} >
                    <GoogleIcon className="h-5 w-5 bg-white px-1 mx-1 rounded-lg "/>
                    <span>Continue with google</span>
                </Button>
            </div>
            
        </div>
    </div>
}

function GoogleIcon(props: any) {
    return (
        <Image src="/google.svg" alt="Google icon" width={20} height={20} {...props} />
    )
}