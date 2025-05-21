import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-1' : 'bg-white py-2'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Mindi Logo" className="h-24" />
        </div>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <Link
              to="hero"
              smooth
              className="text-gray-800 hover:text-orange-500 cursor-pointer transition"
              offset={-60}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="features"
              smooth
              className="text-gray-800 hover:text-orange-500 cursor-pointer transition"
              offset={-60}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="solutions"
              smooth
              className="text-gray-800 hover:text-orange-500 cursor-pointer transition"
              offset={-60}
            >
              Solutions
            </Link>
          </li>
          <li>
            <Link
              to="testimonials"
              smooth
              className="text-gray-800 hover:text-orange-500 cursor-pointer transition"
              offset={-60}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth
              className="text-gray-800 hover:text-orange-500 cursor-pointer transition"
              offset={-60}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-orange-500 transition duration-300 text-sm">
            Get Started
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {!mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-2 px-6 z-40">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="hero"
                smooth
                className="text-gray-800 hover:text-orange-500 cursor-pointer transition block py-1.5"
                offset={-60}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="features"
                smooth
                className="text-gray-800 hover:text-orange-500 cursor-pointer transition block py-1.5"
                offset={-60}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="solutions"
                smooth
                className="text-gray-800 hover:text-orange-500 cursor-pointer transition block py-1.5"
                offset={-60}
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="testimonials"
                smooth
                className="text-gray-800 hover:text-orange-500 cursor-pointer transition block py-1.5"
                offset={-60}
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth
                className="text-gray-800 hover:text-orange-500 cursor-pointer transition block py-1.5"
                offset={-60}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}