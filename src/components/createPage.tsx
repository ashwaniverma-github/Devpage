'use client';
import React from 'react';
import { Twitter, Github, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormContext } from '@/lib/FormContext'; // Adjust the path as necessary
import { IconCamera } from '@tabler/icons-react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';
import UsernameInput from './sm-components/username-claim';
import Mypage from './sm-components/myPage';
import SkeletonLoader from './sm-components/skeleton';
import { useEffect } from 'react';

export default function CreatePage() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { name, setName, userAvatar, setUserAvatar, projects, setProjects, socials, setSocials, skills, setSkills, bio, setBio , loading } = useFormContext();
  const [newSkill, setNewSkill] = useState<string>('');
  const [dataSaving, setDataSaving] = useState<boolean>(false);
  // const [loading , setLoading] = useState<boolean>(true)

  const [selectedIcon, setSelectedIcon] = useState<string | null>('twitter');


  const handleProjectChange = (index: number, field: keyof typeof projects[number], value: string) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleProjectAvatarChange = (index: number, file: File) => {
    const newProjects = [...projects];
    const reader = new FileReader();
    reader.onloadend = () => {
      newProjects[index].avatar = reader.result as string;
      setProjects(newProjects);
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', link: '', avatar: null }]);
  };

  const handleUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = async () => {
    const projectsWithMissingInfo = projects.some(project => {
      const hasNameOrLink = project.name?.trim() || project.link?.trim();
      const hasAvatar = project.avatar?.trim();
  
      // Check if there's a name or link without an avatar
      const missingAvatar = hasNameOrLink && !hasAvatar;
      
      // Check if there's an avatar without a name or link
      const missingNameOrLink = hasAvatar && !(project.name?.trim() && project.link?.trim());
  
      return missingAvatar || missingNameOrLink;
    });
  
    if (projectsWithMissingInfo) {
      toast({ 
        variant: 'destructive', 
        description: "Please ensure each project has a name, link, and avatar." 
      });
      return;
    }
  
    try {
      const userData: any = {
        email: session?.user?.email,
        name: name?.trim() ? name : undefined,
        bio: bio?.trim() ? bio : undefined,
        userAvatar: userAvatar?.trim() ? userAvatar : undefined,
        projects: projects.filter(
          (project) =>
            project.name?.trim() || project.link?.trim() || project.avatar?.trim()
        ),
        skills: skills.length ? skills : undefined,
        socials: socials,
      };
  
      Object.keys(userData).forEach((key) => {
        if (userData[key] === undefined) {
          delete userData[key];
        }
      });
  
      setDataSaving(true);
      await axios.post('/api/save-data', userData);
      toast({ description: "Saved" });
    } catch (error) {
      console.error('Error saving user data', error);
      toast({ variant: 'destructive', description: "Error saving" });
    } finally {
      setDataSaving(false);
    }
  };
  
  const renderInputField = () => {
    switch (selectedIcon) {
      case 'twitter':
        return (
          <Input
            placeholder="Link to your Twitter"
            value={socials.twitter || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, twitter: e.target.value }))}
            className="flex-1"
          />
        );
      case 'github':
        return (
          <Input
            placeholder="Link to your GitHub"
            value={socials.github || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, github: e.target.value }))}
            className="flex-1"
          />
        );
      case 'instagram':
        return (
          <Input
            placeholder="Link to your Instagram"
            value={socials.instagram || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, instagram: e.target.value }))}
            className="flex-1"
          />
        );
      case 'youtube':
        return (
          <Input
            placeholder="Link to your YouTube"
            value={socials.youtube || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, youtube: e.target.value }))}
            className="flex-1"
          />
        );
      case 'linkedin':
        return (
          <Input
            placeholder="Link to your LinkedIn"
            value={socials.linkedin}
            onChange={(e) => setSocials((prev) => ({ ...prev, linkedin: e.target.value }))}
            className="flex-1"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 mx-2 rounded-lg min-w-full ">
      <div className="flex flex-col p-4 md:p-10 rounded-lg space-y-4 bg-gray-100">
        {loading?(
          <SkeletonLoader/>
        ):(
          <>
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative group cursor-pointer">
            <Avatar className="cursor-pointer">
              <AvatarImage className="cursor-pointer" src={userAvatar} alt="User Avatar" />
              <input
                type="file"
                accept="image/*"
                onChange={handleUserAvatarChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Avatar>
          </div>
          <Input
            placeholder="Change your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1"
          />
        </div>
        <Textarea placeholder="I love HTML" value={bio} onChange={(e) => setBio(e.target.value)} />
        
        {/* Social Media Links */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Social Links</h3>
          <div className="flex space-x-4">
            <Twitter 
              className="cursor-pointer" 
              onClick={() => setSelectedIcon('twitter')} 
            />
            <Github 
              className="cursor-pointer" 
              onClick={() => setSelectedIcon('github')} 
            />
            <Instagram 
              className="cursor-pointer" 
              onClick={() => setSelectedIcon('instagram')} 
            />
            <Youtube 
              className="cursor-pointer" 
              onClick={() => setSelectedIcon('youtube')} 
            />
            <Linkedin 
              className="cursor-pointer" 
              onClick={() => setSelectedIcon('linkedin')} 
            />
          </div>

          {/* Render the selected input field */}
          {selectedIcon && (
            <div className="mt-4 flex items-center space-x-2">
              {renderInputField()}
              <Button onClick={() => setSelectedIcon(null)} className=" bg-blue-400  text-white">
                Done
              </Button>
            </div>
          )}
        </div>

        <Button onClick={addProject}>Add Project</Button>
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 mt-4">
            <Input
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Project Link"
              value={project.link}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
              className="flex-1"
            />
            <div className="relative group">
              <Avatar className="cursor-pointer">
                {project.avatar ? (
                  <AvatarImage src={project.avatar} alt={`Project ${index + 1} Avatar`} />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <IconCamera className=' cursor-pointer ' />
                  </div>
                )}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleProjectAvatarChange(index, e.target.files[0]);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mb-4">
            <Input
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-200 rounded-full px-4 py-2 m-1 flex items-center">
                <span>{skill}</span>
                <button onClick={() => removeSkill(skill)} className="ml-2 text-red-500">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <UsernameInput/>
        <Button  onClick={handleSubmit} disabled={dataSaving}>
          {dataSaving ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Save'
          )}
        </Button>
        </>)}
        
        <Mypage/>
      </div>
    </div>

  );
}
