'use client'
import { Twitter, Github, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Copy } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const TriSection = ({user, socials}:{user:any, socials:any}) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      <Hero 
        user={user} 
        onAboutClick={() => scrollToSection(aboutRef)}
        onWorkClick={() => scrollToSection(workRef)}
        onConnectClick={() => scrollToSection(footerRef)}
      />
      <div ref={aboutRef}>
        <About bio={user.bio} />
      </div>
      <div ref={workRef}>
        <Work user={user} />
      </div>
      <div ref={footerRef}>
        <Footer user={user} socials={socials} />
      </div>
    </div>
  )
}

function Hero({ 
  user, 
  onAboutClick,
  onWorkClick,
  onConnectClick
}: { 
  user: any;
  onAboutClick: () => void;
  onWorkClick: () => void;
  onConnectClick: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#CECECE] relative">
      <nav className="fixed w-full flex justify-center pt-4 z-50 px-4">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>

        {/* Navigation Menu */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex space-y-2 md:space-y-0 md:space-x-4 border p-1 backdrop-blur-sm rounded-lg mx-4 ${isMenuOpen ? 'flex-col fixed top-16 bg-white w-[calc(100%-2rem)]' : ''}`}>
          <button 
            onClick={() => {
              onAboutClick();
              setIsMenuOpen(false);
            }}
            className="btn bg-transparent hover:bg-stone-100 border-none shadow-none rounded-md text-sm md:text-base w-full md:w-auto py-2"
          >
            About
          </button>
          <button 
            onClick={() => {
              onWorkClick();
              setIsMenuOpen(false);
            }}
            className="btn bg-transparent hover:bg-stone-100 border-none shadow-none border-gray-300 rounded-md text-sm md:text-base w-full md:w-auto py-2"
          >
            Work
          </button>
          <motion.button
            onClick={() => {
              onConnectClick();
              setIsMenuOpen(false);
            }}
            className="btn bg-white text-black border border-gray-300 rounded-md relative overflow-hidden text-sm md:text-base w-full md:w-auto py-2"
            initial={{ color: '#000000' }}
            whileHover="hover"
            variants={{
              hover: {
                color: '#ffffff',
                transition: { duration: 0.3 },
              },
            }}
          >
            <span className="relative z-10">Let's connect</span>
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ y: '100%' }}
              variants={{
                hover: {
                  y: 0,
                  transition: { duration: 0.3, ease: 'easeInOut' },
                },
              }}
            />
          </motion.button>
        </div>
      </nav>

      <main className="flex items-end h-screen relative">
        <div className="absolute bottom-0 left-0 px-4 sm:px-8 md:px-16 lg:px-24 pb-8 sm:pb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-11xl font-serif text-white leading-tight sm:leading-none z-10">
            {user.name.split(' ')[0]} <br />
            {user.name.split(' ')[1]}
          </h1>
        </div>
      </main>
    </div>
  );
}

function About({bio}: any) {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-48 py-12 sm:py-16 md:py-24 lg:py-32">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
        {bio}
      </p>
    </div>
  )
}

function Work({ user }: any) {
  const { scrollYProgress } = useScroll();
  
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], ['-100%', '0%', '100%']);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const x2 = useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '0%', '-100%']);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div className="min-h-[300vh] p-4 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          className="text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-gray-300 relative whitespace-nowrap"
          style={{
            x: x1,
            scale: scale1,
          }}
        >
          recent projects
        </motion.div>

        <motion.div
          className="text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-end text-gray-300 relative whitespace-nowrap"
          style={{
            x: x2,
            scale: scale2,
          }}
        >
          recent projects
        </motion.div>
      </div>

      <div className="flex items-center justify-center h-screen px-2 sm:px-4">
        <Carousel className="w-full max-w-[280px] sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto text-center">
          <CarouselContent>
            {user.projects.map((project: any) => (
              <CarouselItem key={project.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-2 sm:p-4 md:p-8 flex items-center justify-center"
                >
                  <Card className="w-full border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                        <img 
                          src={project.avatar} 
                          alt={`${project.name} avatar`} 
                          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full mb-3 sm:mb-4 md:mb-6 mx-auto"
                        />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{project.name}</h2>
                        <p className="text-sm sm:text-base md:text-lg text-center">{project.description}</p>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 sm:-left-6" />
          <CarouselNext className="hidden sm:flex -right-4 sm:-right-6" />
        </Carousel>
      </div>
    </div>
  );
}


function ensureUrlProtocol(url: string) {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

function Footer({ user, socials }: { user: any; socials: any }) {
  const socialIcons: { [key: string]: React.ElementType } = {
    twitter: Twitter,
    github: Github,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col space-y-6 sm:space-y-8 p-6 sm:p-12 md:p-16 lg:p-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl" style={{ color: '#444' }}>
          Get in touch
        </h1>
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl break-all sm:break-normal" style={{ opacity: '0.36' }}>
            {user?.email ?? "No email provided"}
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {Object.keys(socialIcons).map((key) => {
              const social = user.socials && user.socials[0];
              const link = social ? ensureUrlProtocol(social[key] || '') : '';
              const IconComponent = socialIcons[key];
              return link ? (
                <motion.a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                </motion.a>
              ) : null;
            })}
          </div>
        </div>
        <div className='bg-black' style={{height:'1px'}}></div>
      </div>
    </div>
  );
}

