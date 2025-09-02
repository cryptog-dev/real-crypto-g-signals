import React from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, ArrowUp } from "lucide-react";
import { FaTwitter, FaInstagram, FaTelegram, FaDiscord } from "react-icons/fa";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "../constants";
import Logo from "../assets/logo1.png"; // Import logo

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Features", to: "features" },
    { name: "Pricing", to: "plans" },
    { name: "Market", to: "market" },
    { name: "About", to: "about" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Terms of Service", to: "/terms-of-service" },
    { name: "Disclaimer", to: "/disclaimer" },
  ];

  const socialLinks = [
    { icon: <FaTwitter className="h-4 w-4" />, href: SOCIAL_LINKS.TWITTER, name: "Twitter" },
    { icon: <FaTelegram className="h-4 w-4" />, href: SOCIAL_LINKS.TELEGRAM, name: "Telegram" },
    { icon: <FaDiscord className="h-4 w-4" />, href: SOCIAL_LINKS.DISCORD, name: "Discord" },
    { icon: <FaInstagram className="h-4 w-4" />, href: SOCIAL_LINKS.INSTAGRAM, name: "Instagram" },
  ];

  return (
    <footer className="lego-card bg-[var(--color-neutral-dark)]/95 border-t border-[var(--color-border-light)] text-contrast-high relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent"></div>
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--color-accent1)]/10 rounded-full blur-xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section with Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={Logo}
                alt="CryptoG Signals"
                className="h-26 w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <p className="text-contrast-medium mb-6 max-w-md text-sm leading-relaxed font-sans">
              Join the market revolution with premium signals, expert insights, and a thriving trading community.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lego-button bg-[var(--color-neutral-dark)]/50 hover:bg-[var(--color-primary)]/20 p-2 rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] text-contrast-high transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4 text-contrast-high font-[Outfit]">Navigate</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-contrast-medium hover:text-[var(--color-primary)] transition-colors cursor-pointer text-sm flex items-center group font-sans"
                  >
                    <span className="w-1 h-1 bg-[var(--color-primary)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-contrast-high font-[Outfit]">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center text-contrast-medium text-sm font-sans">
                <Mail className="h-4 w-4 mr-2 text-[var(--color-accent1)]" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <p className="text-contrast-medium text-sm leading-relaxed font-sans">
                24/7 support via our community channels. Expert help, fast responses.
              </p>
              <a
                href={SOCIAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="lego-button inline-flex items-center space-x-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium font-sans"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join Community</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--color-border-light)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-contrast-medium text-sm font-sans">
            &copy; {currentYear} CryptoG Signals. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <div className="flex space-x-4 text-sm text-contrast-medium font-sans">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.to}
                  className="hover:text-[var(--color-primary)] transition-colors text-xs"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="lego-button p-2 bg-[var(--color-neutral-dark)]/50 hover:bg-[var(--color-primary)]/20 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] text-contrast-high rounded-lg transition-all duration-300"
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
