'use client';
import React, { useState, useEffect } from 'react';
import { Twitter, Github, Instagram, Youtube, Linkedin, User, FileText, Code, Globe, Plus, Trash2, Wand2, CheckCircle, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormContext } from '@/lib/FormContext';
import { IconCamera } from '@tabler/icons-react';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';
import UsernameInput from './sm-components/username-claim';
import Mypage from './sm-components/myPage';
import SkeletonLoader from './sm-components/skeleton';
import AIBio from './sm-components/AI-bio';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePage() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { name, setName, userAvatar, setUserAvatar, projects, setProjects, socials, setSocials, skills, setSkills, bio, setBio, loading } = useFormContext();
  const [newSkill, setNewSkill] = useState<string>('');
  const [dataSaving, setDataSaving] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('twitter');

  const totalSteps = 4;
  const progress = (activeStep / totalSteps) * 100;

  const handleProjectChange = (index: number, field: keyof typeof projects[number], value: string) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleProjectAvatarChange = (index: number, file: File) => {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        description: 'Image size should be less than 5MB'
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        description: 'Please select a valid image file'
      });
      return;
    }

    const newProjects = [...projects];
    const reader = new FileReader();
    reader.onloadend = () => {
      newProjects[index].avatar = reader.result as string;
      setProjects(newProjects);
      toast({
        description: 'Project image updated successfully! 🖼️'
      });
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        description: 'Error reading image file'
      });
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', link: '', description: '', avatar: null }]);
  };

  const deleteProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
    toast({ description: 'Project removed' });
  };

  const handleUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          description: 'Image size should be less than 5MB'
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          description: 'Please select a valid image file'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
        toast({
          description: 'Profile picture updated successfully! 📸'
        });
      };
      reader.onerror = () => {
        toast({
          variant: 'destructive',
          description: 'Error reading image file'
        });
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
      const hasDescription = project.description?.trim();

      const missingAvatar = hasNameOrLink && !hasAvatar;
      const missingNameOrLink = hasAvatar && !(project.name?.trim() && project.link?.trim());
      const missingDescription = hasNameOrLink && !hasDescription;

      return missingAvatar || missingNameOrLink || missingDescription;
    });

    if (projectsWithMissingInfo) {
      toast({
        variant: 'destructive',
        description: "Please ensure each project has a name, link, avatar and description."
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
            project.name?.trim() || project.link?.trim() || project.avatar?.trim() || project.description?.trim()
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
      toast({ description: "Portfolio saved successfully! 🎉" });
    } catch (error) {
      console.error('Error saving user data', error);
      toast({ variant: 'destructive', description: "Error saving portfolio" });
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
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        );
      case 'github':
        return (
          <Input
            placeholder="Link to your GitHub"
            value={socials.github || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, github: e.target.value }))}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        );
      case 'instagram':
        return (
          <Input
            placeholder="Link to your Instagram"
            value={socials.instagram || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, instagram: e.target.value }))}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        );
      case 'youtube':
        return (
          <Input
            placeholder="Link to your YouTube"
            value={socials.youtube || ''}
            onChange={(e) => setSocials((prev) => ({ ...prev, youtube: e.target.value }))}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        );
      case 'linkedin':
        return (
          <Input
            placeholder="Link to your LinkedIn"
            value={socials.linkedin}
            onChange={(e) => setSocials((prev) => ({ ...prev, linkedin: e.target.value }))}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (activeStep < totalSteps) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-3 sm:p-4 md:p-">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">Build Your Portfolio</h1>
            <span className="text-gray-300 text-center sm:text-right text-sm sm:text-base">Step {activeStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-400 h-2 sm:h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Main Form - Full Width */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-800"
              >
                {/* Step 1: Basic Info */}
                {activeStep === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Tell Us About Yourself</h2>
                      <p className="text-gray-300 text-sm sm:text-base">Let&apos;s start with the basics</p>
                    </div>

                    <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-2 sm:space-x-6">
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer border-4 border-gray-700 hover:border-gray-500 transition-all">
                          <AvatarImage className="cursor-pointer" src={userAvatar} alt="User Avatar" />
                          {!userAvatar && (
                            <div className="flex items-center justify-center w-full h-full text-gray-400">
                              <IconCamera className="h-6 w-6 sm:h-8 sm:w-8" />
                            </div>
                          )}
                        </Avatar>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUserAvatarChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          style={{ zIndex: 10 }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-medium">Upload Photo</span>
                        </div>
                        {/* Click indicator */}
                        <div className="absolute -bottom-2 -right-2 bg-gray-600 rounded-full p-1 border-2 border-gray-800">
                          <IconCamera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 w-full">
                        <div className="text-center p-2 sm:text-left mb-2">
                          <p className="text-gray-400  text-xs sm:text-sm">Click on the profile picture to upload your photo</p>
                        </div>
                        <Input
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 text-base sm:text-lg"
                        />
                        <Textarea
                          placeholder="Tell us about yourself, your passion, and what drives you..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 min-h-[80px] sm:min-h-[100px]"
                        />
                        <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <AIBio />
                          <span className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">Use AI to create compelling bio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Social Links */}
                {activeStep === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Connect Your Socials</h2>
                      <p className="text-gray-300 text-sm sm:text-base">Help people find you online</p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
                      {[
                        { icon: Twitter, key: 'twitter', color: 'text-blue-400' },
                        { icon: Github, key: 'github', color: 'text-gray-400' },
                        { icon: Instagram, key: 'instagram', color: 'text-pink-400' },
                        { icon: Youtube, key: 'youtube', color: 'text-red-400' },
                        { icon: Linkedin, key: 'linkedin', color: 'text-blue-600' }
                      ].map(({ icon: Icon, key, color }) => (
                        <button
                          key={key}
                          onClick={() => setSelectedIcon(key)}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all ${
                            selectedIcon === key
                              ? 'border-gray-500 bg-gray-700'
                              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          }`}
                        >
                          <Icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto ${color}`} />
                        </button>
                      ))}
                    </div>

                    {selectedIcon && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3"
                      >
                        {renderInputField()}
                        <Button
                          onClick={() => setSelectedIcon(null)}
                          className="bg-gray-700 hover:bg-gray-600 text-white w-full sm:w-auto"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Done
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 3: Projects */}
                {activeStep === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Showcase Your Projects</h2>
                      <p className="text-gray-300 text-sm sm:text-base">Highlight your best work</p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-2">Click on project avatars to upload images</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {projects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700"
                        >
                          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="relative group cursor-pointer self-center sm:self-start">
                              <Avatar className="w-16 h-16 cursor-pointer border-2 border-gray-700 hover:border-gray-500 transition-all">
                                {project.avatar ? (
                                  <AvatarImage src={project.avatar} alt={`Project ${index + 1} Avatar`} />
                                ) : (
                                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                                    <IconCamera className="h-6 w-6" />
                                  </div>
                                )}
                              </Avatar>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleProjectAvatarChange(index, e.target.files[0]);
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                style={{ zIndex: 10 }}
                              />
                              {/* Hover overlay for project avatars */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-medium">Change</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-3 w-full">
                              <Input
                                placeholder="Project name"
                                value={project.name}
                                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
                              />
                              <Textarea
                                placeholder="Project description"
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
                              />
                              <Input
                                placeholder="Project link"
                                value={project.link}
                                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
                              />
                            </div>
                            <Button
                              onClick={() => deleteProject(index)}
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 self-center sm:self-start"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        onClick={addProject}
                        variant="outline"
                        className="w-full border-dashed border-gray-600  bg-gray-800 text-white hover:border-gray-500"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Another Project
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Skills & Username */}
                {activeStep === 4 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Final Touches</h2>
                      <p className="text-gray-300 text-sm sm:text-base">Add your skills and claim your username</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-center sm:text-left">Your Skills</h3>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                          <Input
                            placeholder="Add a new skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button onClick={addSkill} className="bg-gray-700 hover:bg-gray-600 text-white w-full sm:w-auto">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-gradient-to-r from-gray-600 to-gray-400 text-white rounded-full px-3 sm:px-4 py-1 sm:py-2 flex items-center text-sm sm:text-base"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-2 text-white/80 hover:text-white"
                              >
                                ×
                              </button>
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <UsernameInput />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700 space-y-3 sm:space-y-0">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={activeStep === 1}
                    className="border-gray-600  bg-gray-800 text-white disabled:opacity-50 w-full sm:w-auto order-2 sm:order-1"
                  >
                    Previous
                  </Button>

                  {activeStep < totalSteps ? (
                    <Button
                      onClick={nextStep}
                      className="bg-gray-700 hover:bg-gray-600 text-white w-full sm:w-auto order-1 sm:order-2"
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={dataSaving}
                      className="bg-gray-700 hover:bg-gray-600 text-white w-full sm:w-auto order-1 sm:order-2"
                    >
                      {dataSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Save Portfolio
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
