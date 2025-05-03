import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-zinc-880 pt-16 pb-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg tracking-tight">AI Career Coach</h3>
            <p className="text-zinc-400 text-sm">
              Empowering professionals with AI-driven career guidance and interview preparation tools.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://github.com/Shikhar-Shetty/futurEdge" className="text-zinc-500 hover:text-white transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:contact@example.com" className="text-zinc-500 hover:text-white transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm uppercase tracking-wider">About Us</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We combine artificial intelligence with career expertise to help you navigate your professional journey with confidence. Our platform offers personalized guidance for career growth.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm uppercase tracking-wider">Contact</h4>
            <p className="text-zinc-400 text-sm">
              AJIET<br />
              Mangalore<br />
              contact@aicareercoach.com<br />
              (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 my-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {currentYear} AI Career Coach. All rights reserved.
          </div>
          
          <div className="flex items-center text-zinc-500 text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-white" />
            <span>using Next.js, Tailwind & AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;