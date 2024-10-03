import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy } from 'lucide-react';

export const CentreUpslider = ({ user, socials }: { user: any; socials: any }) => {
  console.log(socials)
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-sans">
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
  const [typingSpeed, setTypingSpeed] = useState(150); // Adjusted speed for smoothness

  const fullText = 'I CODE';

  useEffect(() => {
    const handleTyping = () => {
      const currentText = fullText.substring(0, loopNum);
      setText(currentText);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 800); // Pause before starting to delete
        setTypingSpeed(100); // Speed up when deleting
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTimeout(() => setLoopNum(0), 500); // Pause before restarting typing
        setTypingSpeed(150); // Normal typing speed
      }

      setLoopNum((prev) => (isDeleting ? prev - 1 : prev + 1));
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="font-semibold mb-6 text-2xl">{user.name}</h1>
      <div className="w-full h-64 mb-6 flex items-center justify-center">
        {/* Typing and Deleting Animation for 'I CODE' */}
        <motion.div
          style={{
            fontSize: '6rem', // 8xl equivalent
            fontFamily: 'monospace',
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // Prevent text wrapping
            borderRight: '4px solid', // Simulate the typing cursor
            paddingRight: '8px',
            display: 'inline-block',
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }} // Smoother transition
        >
          {text}
        </motion.div>
      </div>
      <p className="text-base mb-6">{user.bio}</p>
      <div className="bg-gray-300 w-full h-px mb-4"></div>
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="font-serif text-xl">Selected Projects</h2>
        <Code size={20} />
      </div>
    </div>
  );
}

function ProjectsList({ projects }: { projects: any[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          key={project.id}
          className="block"
        >
          <motion.div
            className="relative  border-gray-200 pb-6"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{project.name}</h3>
            </div>
            <p className=" text-base   mt-4">
              {project.description}
            </p>

            {hoveredProject === project.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 p-4 z-50 flex justify-center items-center"
              >
                <motion.div
                  className="relative w-full max-w-lg"
                  style={{ paddingBottom: '56.25%' }}
                  animate={{
                    x: mousePos.x / 10 - 50,
                    y: mousePos.y / 10 - 50,
                  }}
                >
                  <iframe
                    src={project.link}
                    className="absolute inset-0 w-full h-full rounded-xl border-2"
                    title={project.name}
                    style={{ transform: 'scale(0.5)', transformOrigin: 'bottom right' }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
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
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      // Modern approach using Clipboard API
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      // Fallback approach using execCommand for older devices
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of the page in some browsers
      textarea.style.opacity = '0';       // Make it invisible
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      
      document.body.removeChild(textarea);
    } else {
      // If both methods are not supported
      console.error('Clipboard API is not supported on this device');
      alert('Copying to clipboard is not supported on your device.');
    }
  };
  

  const ensureUrlProtocol = (url: string): string | undefined => {
    if (url.trim() === '') return undefined;
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="py-6 text-gray-700">
      <div className="w-full bg-gray-300 h-px mb-4"></div>
      <div className="flex flex-col items-start">
        <h2 className=" text-lg mb-2 ">Get in touch</h2>

        {/* Email Copy Box */}
        <div className="flex items-center border border-gray-300 rounded-sm p-3  w-full mb-4 mt-2">
          <p className="flex-grow  font-semibold ">{email}</p>
          <button
            onClick={copyToClipboard}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            {copied ? <span>Copied!</span> : <span>Copy</span>}
            <Copy size={18} />
          </button>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-2">
          {socials && socials.length > 0 && socials[0] && (
            Object.entries(socials[0])
              // Filter out 'id' and 'userid' from being rendered
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
                    className="text-lg underline text-gray-700 mr-4 hover:text-gray-900"
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
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