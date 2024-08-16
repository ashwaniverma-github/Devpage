import prisma from "../../../../prisma/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
export async function POST(req:Request){
    const session = await getServerSession(authOptions)
    if(!session){
        return new Response(JSON.stringify({error:"Unauthorized"}),{
            status:401
        })
    }
    const {email} = await req.json()
    try{
        const user = await prisma.user.findUnique({
            where:{email:email},
            select:{username:true}
        })

        if(user){
            return new  Response(JSON.stringify({username:user.username}),{
                status:200,
                headers:{ 'Content-Type': 'application/json' }
            })
        }
        else{
            return new Response(JSON.stringify({error:"user not found"}),{
                status:404,
                headers:{'Content-Type':'application/json'}
            })
        }

    }catch(err){
        console.error(err)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}