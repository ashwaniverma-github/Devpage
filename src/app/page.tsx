'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Rocket, Users, Star, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ['Startups', 'Projects'];
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 100 : 200;
    const deleteSpeed = 100;
    
    const type = () => {
      const current = words[wordIndex];
      
      if (isDeleting) {
        setCurrentWord(current.substring(0, currentWord.length - 1));
        if (currentWord === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentWord(current.substring(0, currentWord.length + 1));
        if (currentWord === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };
    
    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex, words]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-gray-300" />
              <span className="text-2xl font-bold text-white">Devpage</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-gray-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/signin">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl my-4 md:text-7xl font-bold text-white mb-6">
              Showcase Your
              <span className="text-cyan-400 font-extrabold font-serif p-6 text-6xl md:text-8xl tracking-wider">
                {currentWord}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <h2 className='my-6' >Like a Pro</h2>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Build a stunning portfolio in minutes. Perfect for indie hackers, startup founders, 
              and vibe coders who want to make their mark.
            </p>
            <div className="flex pt-8 flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signin">
                <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white text-lg px-8 py-6 border border-gray-600">
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Your Portfolio
                </Button>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for the Modern Developer
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop spending hours on portfolio websites. Focus on building your startup while we handle the presentation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400">
                Get your portfolio live in under 5 minutes. No coding required, just pure creativity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Developer First</h3>
              <p className="text-gray-400">
                Built by developers, for developers. Clean code, modern tech stack, and endless customization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Startup Ready</h3>
              <p className="text-gray-400">
                Perfect for MVPs, demos, and investor presentations. Make your startup stand out.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Builders
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join hundreds of developers, founders, and creators who&apos;ve launched their portfolios with Devpage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400">Portfolios Created</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400">Startups Launched</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>Active Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-gray-400" />
              <span>Open Source</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Showcase Your Startup?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join the community of builders who are making their mark. Your next big opportunity starts here.
            </p>
            <Link href="/signin">
              <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white text-xl px-10 py-6 border border-gray-600">
                <Rocket className="mr-3 h-6 w-6" />
                Start Building Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-gray-300" />
              <span className="text-xl font-bold text-white">Devpage</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://x.com/ashwanivermax" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/ashwaniverma-github/Devpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Devpage. Built with ❤️ for the developer community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

