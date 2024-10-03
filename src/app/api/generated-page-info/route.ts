import prisma from "../../../../prisma/db";
import Redis from 'ioredis';

// const redis = new Redis({
//   password: 'h85HVmQ1eICToxRaSgnHqYqXSyCBvTgD',
//   host: 'redis-11851.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
//   port: 11851,
// });


// Connect to Redis
// redis.connect().catch(console.error);

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    // Check Redis cache for the user data
    // const cachedUser = await redis.get(`user:${username}`);
    // if (cachedUser) {
    //   return new Response(JSON.stringify(JSON.parse(cachedUser)), { status: 200 });
    // }

    // Query the database if cache miss
    const user = await prisma.user.findUnique({
      where: { username },
      include: { projects: true, socials: true , style:true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Cache the user data with an expiration time of 1 hour
    // await redis.set(`user:${username}`, JSON.stringify(user), 'EX', 3600);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
