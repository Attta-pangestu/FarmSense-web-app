// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">FarmSense</h3>
            <p className="text-green-200">Empowering farmers with smart technology</p>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-2">Created By</h4>
            <p className="text-green-200">Atha Rizki Pangestu</p>
            <p className="text-sm text-green-300 mt-1">Lead Developer & Contributor</p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-green-700 text-center text-sm text-green-300">
          <p>© {new Date().getFullYear()} FarmSense. All rights reserved.</p>
          <p className="mt-1">A startup project dedicated to revolutionizing farming assistance</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;