import { notFound } from 'next/navigation';
import React from 'react';
import prisma from '../../../prisma/db';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Twitter, Github, Instagram, Youtube, Linkedin } from 'lucide-react';

// Define the ensureUrlProtocol function here
function ensureUrlProtocol(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { projects: true, socials: true },
  });
  if (!user) {
    return null;
  }
  return user;
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }

  const socialIcons = {
    twitter: Twitter,
    github: Github,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <div className="container mx-auto p-5 bg-slate-300 min-h-screen max-w-full max-h-full">
      <div className="flex flex-col lg:flex-row">
        {/* User Details */}
        <div className="w-full lg:w-2/5 lg:fixed lg:h-screen overflow-y-auto">
          <div className="bg-slate-20 flex flex-col items-center p-2">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border border-amber-400">
              <AvatarImage src={user.profile} />
            </Avatar>
            <h1 className="text-2xl md:text-3xl font-extrabold font-mono p-4">{user.name}</h1>
            <p className="px-5 text-base md:text-lg font-semibold font-sans text-wrap text-center">
              {user.bio}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap gap-2 p-4 m-2 border border-zinc-400 shadow-orange-30 rounded-3xl w-fit">
              {user.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-amber-100 shadow-lg shadow-orange-200 px-2 py-1 rounded-lg text-sm md:text-lg font-sans"
                >
                  {skill}
                </span>
              ))}
            </div>
            <h1 className="text-lg md:text-xl font-bold text-center shadow-sm rounded-2xl p-2 font-mono">
              Skills
            </h1>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.keys(socialIcons).map((key) => {
                const link = ensureUrlProtocol(user.socials[0][key as keyof typeof user.socials[0]] || undefined);
                const IconComponent = socialIcons[key as keyof typeof socialIcons];
                return link ? (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="h-6 w-6 text-blue-600 hover:text-blue-800" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="w-full lg:w-3/5 lg:ml-auto mt-8 lg:mt-0 lg:pl-10">
          <div className="sticky top-0 z-10 bg-amber-100 shadow-2xl shadow-orange-300 p-2 mt-5 rounded-full text-center">
            <h2 className="text-xl md:text-2xl font-semibold">Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {user.projects.map((project: any) => (
              <div key={project.id} className="bg-slate-100 p-4 rounded-3xl border">
                <div>
                  <Avatar className="rounded-full">
                    <AvatarImage src={project.avatar} />
                  </Avatar>
                  <h3 className="text-lg md:text-xl font-bold mt-2">{project.name}</h3>
                </div>
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline mt-2 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
