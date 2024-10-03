import prisma from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getSession } from "next-auth/react";

export async function POST(req:Request){
    const session = await getServerSession(authOptions)
    
    if(!session){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
        
    }
    

    try{
        const body = await req.json()
        const style = body.pageStyle
        

        if(!style){
            return new Response(JSON.stringify({message:"style required"}),{status:401})
        }

        const user = await prisma.user.findUnique({
            where:{email:session.user?.email||''}
        })

        if(!user){
            return new Response(JSON.stringify({message:"user not found"}))
        }

        await prisma.style.upsert({
            where:{userId:user.id || ''},
            update:{pageStyle:style},
            create:{userId:user.id,pageStyle:style}
        })

        return new Response(JSON.stringify({message:"Style saved successfully"}),{status:200})

    }catch(e){
        console.error(e)
        return new Response(JSON.stringify({message:"Error saving style"}),{status:404})
    }
}