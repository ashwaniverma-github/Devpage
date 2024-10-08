import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from './ui/use-toast';

export default function Style() {
  const {toast} = useToast()
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for animation

  const handlePageSelection = async (title: string) => {
    setSelectedPage(title);
    setLoading(true); // Trigger loading animation

    try {
      // Make a server call to save the selected style
      const response = await fetch('/api/save-style', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageStyle: title,
        }),
      });

      if (response.ok) {
        console.log('Style saved successfully!');
        toast({description:"Style updated"})
      } else {
        console.error('Failed to save style.');
        toast({description:'error updating style'})
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading animation
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-semibold text-center pb-6 md:pb-8 flex justify-center ">Choose your Page <p className='font-bold mx-2' >(beta)</p> </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Page
          title="Default"
          isSelected={selectedPage === 'Default'}
          loading={loading}
          onSelect={() => handlePageSelection('Default')}
          img='/mac2.png'
        />
        <Page
          title="Center Upslider"
          isSelected={selectedPage === 'Center Upslider'}
          loading={loading}
          onSelect={() => handlePageSelection('Center Upslider')}
          img='/center-upslider.png'
        />
      </div>
    </div>
  );
}

interface PageProps {
  title: string;
  isSelected: boolean;
  loading: boolean;
  onSelect: () => void;
  img:string;
}

function Page({ title, isSelected, loading, onSelect ,img}: PageProps) {
  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={onSelect}>
      <motion.div
        className={`p-2 shadow-lg rounded-lg w-full 
          ${isSelected ? 'bg-yellow-500' : 'bg-slate-500'} 
          ${loading && isSelected ? 'animate-pulse' : ''}
        `}
        whileHover={{
          scale: 1.05,
          backgroundColor: isSelected ? "#fbbf24" : "#fcd34d",
        }}
      >
        <img src={img} alt="" className="w-full h-auto rounded-md" />
      </motion.div>
      <div>
        <h1 className='font-semibold p-4 text-center'>{title}</h1>
      </div>
    </div>
  );
}

