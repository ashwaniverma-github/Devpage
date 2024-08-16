import { getServerSession } from 'next-auth/next';
import prisma from '../../../../prisma/db';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { name, userAvatar, projects, skills, email, bio } = await req.json();
  if (session.user?.email !== email) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
    });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email: email }, // Assuming email is unique
      update: { name, profile: userAvatar, skills, bio },
      create: { email, name, profile: userAvatar, skills, bio },
    });

    for (const project of projects) {
      await prisma.project.create({
        data: {
          name: project.name,
          avatar: project.avatar,
          link: project.link,
          userId: user.id,
        },
      });
    }

    return new Response(JSON.stringify({ message: 'User data saved successfully' }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'An error occurred while saving user data' }), {
      status: 500,
    });
  }
}
