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

  const { name, userAvatar, projects, socials, skills, email, bio } = await req.json();
  
  if (session.user?.email !== email) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
    });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: { name, profile: userAvatar, skills, bio },
      create: { email, name, profile: userAvatar, skills, bio },
    });

    if (projects && projects.length > 0) {
      await prisma.project.deleteMany({ where: { userId: user.id } });

      for (const project of projects) {
        await prisma.project.create({
          data: {
            name: project.name,
            avatar: project.avatar,
            link: project.link,
            description:project.description,
            userId: user.id,
          },
        });
      }
    }

    if (socials) {
      // Check if socials already exist for this user
      const existingSocial = await prisma.social.findUnique({
        
        where: { userId: user.id },
      });

      if (existingSocial) {
        // Update the existing socials
        await prisma.social.update({
          where: { id: existingSocial.id },
          data: {
            twitter: socials.twitter,
            linkedin: socials.linkedin,
            github: socials.github,
            instagram: socials.instagram,
            youtube: socials.youtube,
          },
        });
      } else {
        // Create new socials entry
        await prisma.social.create({
          data: {
            twitter: socials.twitter,
            linkedin: socials.linkedin,
            github: socials.github,
            instagram: socials.instagram,
            youtube: socials.youtube,
            userId: user.id,
          },
        });
      }
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
