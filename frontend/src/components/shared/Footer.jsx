import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tropical-teal text-white border-t border-white/20 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-white">Easy</span><span className="text-lemon-chiffon">Hire</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted partner in finding the perfect job or the ideal candidate. 
              Connecting talent with opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-white/80 hover:text-lemon-chiffon transition-colors">Home</a></li>
              <li><a href="/jobs" className="text-white/80 hover:text-lemon-chiffon transition-colors">Browse Jobs</a></li>
              <li><a href="/browse" className="text-white/80 hover:text-lemon-chiffon transition-colors">Search</a></li>
              <li><a href="/resume/upload" className="text-white/80 hover:text-lemon-chiffon transition-colors">Upload Resume</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ankit_sharma_5304/"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-vibrant-coral rounded-lg transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ankit676756@gmail.com"
                aria-label="Email"
                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-sharma-67765228a/"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} EasyHire Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
