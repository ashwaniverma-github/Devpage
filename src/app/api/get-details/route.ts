import prisma from '../../../../prisma/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req:Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ error: 'Unauthorized' });
  }

  const userEmail = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        projects: true,
        socials: true,
      },
    });

    if (!user) {
      return Response.json({ error: 'User not found' });
    }

    return Response.json({
      name:user.name,
      bio:user.bio,
      profile:user.profile,
      projects: user.projects,
      socials: user.socials,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' });
  }
}
