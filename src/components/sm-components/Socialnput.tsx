
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Twitter, Github, Instagram, Youtube, Linkedin } from 'lucide-react';
export default function SocialLink({ icon: Icon, placeholder, value, onChange }:any){
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-white">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <Input 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange} 
          className="w-full"
        />
      </div>
    </div>
  );
};

