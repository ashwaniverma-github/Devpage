'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Project {
  name: string;
  link: string;
  avatar: string | null;
  description:string;
}

interface Social {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
}

interface FormContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  userAvatar: string;
  setUserAvatar: React.Dispatch<React.SetStateAction<string>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  socials: Social;
  setSocials: React.Dispatch<React.SetStateAction<Social>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([{ name: '', link: '', description:'' , avatar: null }]);
  const [socials, setSocials] = useState<Social>({
    twitter: '',
    linkedin: '',
    github: '',
    instagram: '',
    youtube: '',
  });
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await axios.get('/api/get-details');
          const userData = response.data;

          setName(userData.name || '');
          setBio(userData.bio || '');
          setUserAvatar(userData.profile || '');
          setProjects(userData.projects || []);
          setSocials(userData.socials[0] || {
            twitter: '',
            linkedin: '',
            github: '',
            instagram: '',
            youtube: '',
          });

          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, [status, session?.user?.email]);

  return (
    <FormContext.Provider value={{ name, setName, bio, setBio, userAvatar, setUserAvatar, projects, setProjects, socials, setSocials, skills, setSkills, loading }}>
      {children}
    </FormContext.Provider>
  );
};
