import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, ExternalLink } from 'lucide-react';

export const CentreUpslider = ({ user, socials }: { user: any; socials: any }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 font-sans">
      <Hero user={user} />
      <ProjectsList projects={user.projects} />
      <Footer user={user} socials={socials} />
    </div>
  );
};

function Hero({ user }: { user: any }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const fullText = 'I CODE';

  useEffect(() => {
    const handleTyping = () => {
      const currentText = fullText.substring(0, loopNum);
      setText(currentText);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 800);
        setTypingSpeed(100);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTimeout(() => setLoopNum(0), 500);
        setTypingSpeed(150);
      }

      setLoopNum((prev) => (isDeleting ? prev - 1 : prev + 1));
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="font-semibold mb-6 text-2xl sm:text-3xl">{user.name}</h1>
      <div className="w-full h-40 sm:h-64 m-6 flex items-center justify-center">
        <motion.div
          className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold whitespace-nowrap border-r-4 border-current pr-2 inline-block"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {text}
        </motion.div>
      </div>
      <p className="text-base sm:text-lg mb-6">{user.bio}</p>
      <div className="bg-gray-300 w-full h-px mb-4"></div>
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="font-serif text-xl sm:text-2xl mt-2">My Creations</h2>
        <Code size={24}  className='mt-3' />
      </div>
    </div>
  );
}

function ProjectsList({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-8 mt-4">
      {projects.map((project) => (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          key={project.id}
          className="block"
        >
          <div className="relative border-b border-gray-200 pb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl sm:text-2xl font-semibold">{project.name}</h3>
              <ExternalLink size={20} className="text-gray-500" />
            </div>
            <p className="text-base sm:text-lg mt-4">
              {project.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

function Footer({ user, socials }: { user: any; socials: any }) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user?.email]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const ensureUrlProtocol = (url: string): string | undefined => {
    if (url.trim() === '') return undefined;
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="py-8 mt-4 text-gray-700">
      <div className="w-full bg-gray-300 h-px mb-6"></div>
      <div className="flex flex-col items-start">
        <h2 className="text-xl sm:text-2xl mb-4">Get in touch</h2>

        <div className="flex items-center border border-gray-300 rounded-lg p-3 w-full mb-6 mt-2">
          <p className="flex-grow font-semibold truncate mr-2">{email}</p>
          <button
            onClick={copyToClipboard}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            {copied ? 'Copied!' : 'Copy'}
            <Copy size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          {socials && socials.length > 0 && socials[0] && (
            Object.entries(socials[0])
            //@ts-ignore
              .filter(([key, value]) => key !== 'id' && key !== 'userId' && value.trim() !== '')
              .map(([key, value]) => {
                const link = ensureUrlProtocol(value as string);
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); 
                return link ? (
                  <motion.a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline text-gray-700 hover:text-gray-900"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {capitalizedKey}
                  </motion.a>
                ) : null;
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default CentreUpslider;
