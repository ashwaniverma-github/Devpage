import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

interface DashbarProps {
  onNavigate: (componentName: string) => void;
  onClick:any
}

export default function Dashbar({ onNavigate , onClick}: DashbarProps) {
  return (
    <div className="fixed top-0 left-0 pt-5 bg-white w-full z-50">
      <div className="navbar border flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-full">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="font-bold text-xl m-2">Devpage</h1>
          <button
            onClick={() => {
              onNavigate("page");
            }}
            className=" font-semibold text-lg ml-5"
          >
            Page
          </button>
          <button
            onClick={() => {
              onNavigate("style");
            }}
            className=" font-semibold text-lg ml-5"
          >
            Style
          </button>
        </div>

        <div className="flex items-center">
          <div className="hover:bg-slate-100 p-2 rounded-lg">
            <button onClick={() => signOut()} className="font-bold text-base">
              Logout
            </button>
          </div>

          <Link href="">
            <Button  onClick={onClick} className="text-lg rounded-xl mx-2">Deploy</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
