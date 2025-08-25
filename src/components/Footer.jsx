import React from "react";
import { Link } from "react-scroll";
import { Mail } from "lucide-react";
import { FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "FAQs", to: "features" },
    { name: "Guides", to: "plans" },
    { name: "Support", to: "market" },
    { name: "About Us", to: "about" },
  ];

  const socialLinks = [
    {
      icon: <FaTwitter className="h-5 w-5" />,
      href: "https://x.com/T_Cryptog",
      name: "Twitter",  
    },
    {
      icon: <FaInstagram className="h-5 w-5" />,
      href: "https://www.instagram.com/therealcrypto_g/",
      name: "Instagram",
    },
    {
      icon: <FaTelegram className="h-5 w-5" />,
      href: "https://t.me/therealcryptog_official#",
      name: "Telegram",
    },
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="hero" smooth={true} duration={500}>
              <div className="flex items-center cursor-pointer mb-4">
                <span className="text-green-400 text-2xl font-bold">
                  Crypto
                </span>
                <span className="text-amber-400 text-2xl font-bold">G</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium crypto trading signals, expert analysis, and a supportive
              community to help you navigate the cryptocurrency markets
              profitably.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-green-400" />
                therealcryptog.official@gmail.com
              </p>
              <p className="text-gray-400">
                Join our Telegram channel for the fastest support and updates.
              </p>
              <a
                href="support-google-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} CryptoG. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
