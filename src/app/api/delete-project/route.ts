import prisma from "../../../../prisma/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"

export async function DELETE(req:Request) {
    const session = await getServerSession(authOptions)
    if(!session || !session.user?.email){
        return new Response(JSON.stringify({err:"unauthorized"}))
    }
    const {projectId} = await req.json()
    
    try{
        
        const project = await prisma.project.findUnique({
            where:{id:projectId},
            include:{user:true}
        })

        if(!project || project.user.email !== session.user.email){
            return new Response(JSON.stringify({forbidden:"you dont own this project"}))
        }

        await prisma.project.delete({
            where:{id:projectId}
        })
        return new Response(JSON.stringify({message:"Project deleted successfully"}))

    }catch(err){
        console.error(err)
    }
    
}