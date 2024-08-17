'use client'
import { MacbookScroll } from "@/components/ui/macbookScroll";
import Navbar from "@/components/navbar";
import SmHomepage from "./Sm-homepage";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="pt-[64px]"> {/* Adjust this value to match your Navbar height */}
        <div className="max-md:block">
          <SmHomepage />
        </div>
        <div className="hidden lg:block">
          <MacbookScroll src={`https://www.devpage.in/elonmusk`} />
        </div>
      </div>
    </div>
  );
}