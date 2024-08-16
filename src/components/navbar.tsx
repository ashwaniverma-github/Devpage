'use client'
import ThemeController from "./sm-components/themeController"
import { Button } from "./ui/button"
import Link from "next/link"
export default function Navbar(){
    return <div className="fixed top-0 left-0 w-full z-50 ">
        <div className="navbar border-b flex justify-between items-center  bg backdrop-blur-lg shadow-lg ">
                <div className="flex-1">
                    <h1 className="font-bold text-xl m-4">Devpage</h1>
                </div>
                <div className="hidden  px-10">
                    <button className="font-semibold" onClick={()=>{alert('we are free for now')}}>Pricing</button>
                </div>
                <div className="flex items-center mr-2">
                    <Link  href={'/signin'}>
                        <Button className="text-lg rounded-xl mx-2" >
                            Sign in
                        </Button>
                    </Link>
                    
                </div>
            </div>
    </div>
}