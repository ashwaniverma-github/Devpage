'use client'
import { MacbookScroll } from "@/components/ui/macbookScroll";
import Navbar from "@/components/navbar";
import SmHomepage from "./Sm-homepage";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="pt-[64px]"> {/* Adjust this value to match your Navbar height */}
        <div className="max-sm:block mt-5 sm:hidden">
          <SmHomepage />
        </div>
        <div className="hidden sm:block">
          <MacbookScroll src={`/macwall (3).png`} />
        </div>
      </div>
    </div>
  );
}