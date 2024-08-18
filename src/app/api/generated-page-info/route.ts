import prisma from "../../../../prisma/db";

export async function POST(req: Request) {

    const {username} = await  req.json()
//   const url = new URL(req.url);
//   const queryParams = new URLSearchParams(url.search);
//   const username = queryParams.get('query');  

//   if (!username || typeof username !== 'string') {
//     return new Response(JSON.stringify({ error: 'Username is required' }), { status: 400 });
//   }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { projects: true, socials: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
