'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IconCamera } from '@tabler/icons-react';

interface Project {
  name: string;
  link: string;
  avatar: string | null;
}

interface FormContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  bio:string;
  setBio:React.Dispatch<React.SetStateAction<string>>
  userAvatar: string;
  setUserAvatar: React.Dispatch<React.SetStateAction<string>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [name, setName] = useState<string>('');
  const [bio,setBio] = useState<string>('')
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([{ name: '', link: '', avatar: null }]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      setName(session?.user?.name || '');
      setUserAvatar(session?.user?.image || '');
    }
  }, [status, session]);

  return (
    <FormContext.Provider value={{ name, setName, bio , setBio, userAvatar, setUserAvatar, projects, setProjects, skills, setSkills }}>
      {children}
    </FormContext.Provider>
  );
};
