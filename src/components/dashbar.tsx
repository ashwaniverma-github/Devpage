import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Assuming you're using lucide-react for icons

interface DashbarProps {
  onNavigate: (componentName: string) => void;
  onClick: any;
}

export default function Dashbar({ onNavigate, onClick }: DashbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
            <h1 className="font-bold text-xl">Devpage</h1>
          </Link>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavItems onNavigate={onNavigate} />
            <ActionButtons onClick={onClick} />
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <NavItems onNavigate={onNavigate} />
            <ActionButtons onClick={onClick} />
          </div>
        )}
      </div>
    </div>
  );
}

const NavItems = ({ onNavigate }: { onNavigate: (componentName: string) => void }) => (
  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
    <button
      onClick={() => onNavigate("page")}
      className="font-semibold text-lg hover:bg-slate-100 p-2 rounded-lg"
    >
      Page
    </button>
    <button
      onClick={() => onNavigate("style")}
      className="font-semibold text-lg hover:bg-slate-100 p-2 rounded-lg"
    >
      Style
    </button>
  </div>
);

const ActionButtons = ({ onClick }: { onClick: any }) => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
    <div className="hover:bg-slate-100 p-2 rounded-lg w-full md:w-auto">
      <button onClick={() => signOut()} className="font-bold text-base w-full md:w-auto">
        Logout
      </button>
    </div>
    <Link href="" className="w-full md:w-auto">
      <Button onClick={onClick} className="text-lg rounded-xl w-full md:w-auto">
        Deploy
      </Button>
    </Link>
  </div>
);