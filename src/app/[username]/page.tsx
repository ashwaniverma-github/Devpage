'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Twitter, Github, Instagram, Youtube, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '../loading';
import GitHubStats from '@/components/githubStats';

function ensureUrlProtocol(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
}

async function fetchUser(username: string) {
  const baseUrl = process.env.PAGE_URL || ''; 
  try {
    const response = await fetch(`${baseUrl}/api/generated-page-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.statusText);
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    async function getUserData() {
      const userData = await fetchUser(params.username);
      if (userData) {
        setUser(userData);
      } else {
        notFound();
      }
    }

    getUserData();
  }, [params.username]);

  if (!user) {
    return <Loading/>
  }

  const socialIcons = {
    twitter: Twitter,
    github: Github,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  const githubUrl = user.socials[0]?.github

  return (
    <div className="container mx-auto py-4  bg-slate-300 min-h-screen max-w-full max-h-full">
      <div className="flex flex-col lg:flex-row ">
        {/* User Details left-side */}
        <div className="w-full lg:w-2/5 lg:fixed lg:h-screen overflow-y-auto">
          <div className="bg-slate-20 flex flex-col items-center p-2">
            <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24 md:w-32 md:h-32 border rounded-full border-amber-400">
              <Avatar className="w-full h-full">
                <AvatarImage src={user.profile} />
              </Avatar>
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-mono p-2">{user.name}</h1>
            <p className="px-5 text-base md:text-lg font-semibold font-sans text-wrap text-center">
              {user.bio}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap gap-2 p-4 m-2 border border-zinc-400 shadow-orange-30 rounded-3xl w-fit">
              {user.skills.map((skill: string, index: number) => (
                <motion.span
                  key={index}
                  className="bg-amber-100 shadow-lg shadow-orange-200 px-2 py-1 rounded-lg text-sm md:text-lg font-sans"
                  whileHover={{ scale: 1.1, backgroundColor: "#fcd34d" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <h1 className="text-lg md:text-xl font-bold text-center p-2 font-mono">
              Skills
            </h1>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-2">
              {Object.keys(socialIcons).map((key) => {
                const link = ensureUrlProtocol(user.socials[0][key as keyof typeof user.socials[0]] || undefined);
                const IconComponent = socialIcons[key as keyof typeof socialIcons];
                return link ? (
                  <motion.a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent className="h-6 w-6 text-blue-600 hover:text-blue-800" />
                  </motion.a>
                ) : null;
              })}
            </div>
          </div>
          <GitHubStats  githubUrl={githubUrl}/>
        </div>

        {/* Projects at right side */}
        <div className="w-full lg:w-3/5 lg:ml-auto mt-8 lg:mt-0 lg:pl-10">
          <div className="sticky top-0 z-10 bg-amber-100 shadow-2xl shadow-orange-300 p-2 mt-5 rounded-full text-center">
            <h2 className="text-xl md:text-2xl font-semibold">Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {user.projects.map((project: any) => (
              <motion.div 
                key={project.id} 
                className="bg-slate-100 p-4 rounded-3xl border"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
              >
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
              </motion.div>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}
