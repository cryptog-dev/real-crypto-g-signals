import React from "react";
import { Link } from "react-scroll";
import { Mail, MessageCircle, ArrowUp } from "lucide-react";
import { FaTwitter, FaInstagram, FaTelegram, FaDiscord } from "react-icons/fa";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: "Features", to: "features" },
    { name: "Pricing", to: "plans" },
    { name: "Market", to: "market" },
    { name: "About", to: "about" },
  ];

  const socialLinks = [
    {
      icon: <FaTwitter className="h-4 w-4" />,
      href: SOCIAL_LINKS.TWITTER,
      name: "Twitter",  
    },
    {
      icon: <FaTelegram className="h-4 w-4" />,
      href: SOCIAL_LINKS.TELEGRAM,
      name: "Telegram",
    },
    {
      icon: <FaDiscord className="h-4 w-4" />,
      href: SOCIAL_LINKS.DISCORD,
      name: "Discord",
    },
    {
      icon: <FaInstagram className="h-4 w-4" />,
      href: SOCIAL_LINKS.INSTAGRAM,
      name: "Instagram",
    },
  ];

  return (
    <footer className="bg-[var(--color-neutral-dark)]/95 backdrop-blur-lg border-t border-[var(--color-neutral-dark)]/30 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent"></div>
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-accent1)]/5 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-[var(--color-accent1)] text-2xl font-bold font-heading">
                Crypto
              </span>
              <span className="text-[var(--color-secondary)] text-2xl font-bold font-heading">G</span>
              <span className="ml-2 text-xs bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent1)] text-transparent bg-clip-text font-semibold">
                SIGNALS
              </span>
            </div>
            <p className="text-[var(--color-neutral-light)]/70 mb-6 max-w-md text-sm leading-relaxed">
              Premium crypto trading signals, expert analysis, and a supportive
              community to help you navigate the cryptocurrency markets
              profitably.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lego-button bg-[var(--color-neutral-dark)]/50 hover:bg-[var(--color-primary)]/10 p-2.5 rounded-lg border-b-4 border-[var(--color-neutral-dark)]/30 text-[var(--color-neutral-light)] transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-neutral-light)] font-heading">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-[var(--color-neutral-light)]/70 hover:text-[var(--color-primary)] transition-colors cursor-pointer text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--color-primary)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-neutral-light)] font-heading">
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-[var(--color-neutral-light)]/70 text-sm">
                <Mail className="h-4 w-4 mr-2 text-[var(--color-accent1)]" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <p className="text-[var(--color-neutral-light)]/70 text-sm leading-relaxed">
                24/7 support through our community channels. Fast responses, expert help.
              </p>
              <a
                href={SOCIAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="lego-button inline-flex items-center space-x-2 bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 border-b-4 border-[var(--color-primary-dark)] hover:border-b-2 hover:mt-0.5 font-sans"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--color-neutral-dark)]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--color-neutral-light)]/70 text-sm">
            &copy; {currentYear} CryptoG Signals. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <div className="flex space-x-4 text-sm text-[var(--color-neutral-light)]/70">
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors text-xs">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors text-xs">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors text-xs">
                Disclaimer
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="lego-button ml-4 p-2 bg-[var(--color-neutral-dark)]/50 hover:bg-[var(--color-primary)]/10 border-b-4 border-[var(--color-neutral-dark)]/30 text-[var(--color-neutral-light)] rounded-lg transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4 hover:text-[var(--color-primary)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;