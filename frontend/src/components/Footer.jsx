import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      <div>© {new Date().getFullYear()} Finance Manager. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
