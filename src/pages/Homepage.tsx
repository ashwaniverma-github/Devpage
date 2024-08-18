'use client';
import Navbar from "@/components/navbar";
import SmHomepage from "./Sm-homepage";
import { ThreeDCardDemo } from "@/components/card-compo";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "./Sm-homepage";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="pt-[64px]"> {/* Adjust this value to match your Navbar height */}
        <div className="max-md:block">
          <SmHomepage />
        </div>
        <div className="hidden md:flex">
          <div className="flex w-full">
            <div className="w-1/2">
              <ThreeDCardDemo />
            </div>
            <div className="w-1/2 flex flex-col  items-center justify-center">
              <h2
                className="text-4xl  my-20 m-2 text-center font-bold"
                style={{ lineHeight: '60px', wordSpacing: '8px' }}
              >
                Showcase your Skills,Projects, and your Socials so that people
                know about you
              </h2>

              <Link href="/signin">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                >
                  <Button className="p-10 text-xl rounded-full my-20">
                    Build Now 
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
