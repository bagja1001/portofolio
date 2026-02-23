import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'services', 'projects', 'contact'];
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        setActiveSection(id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = useCallback((e, href) => {
        e.preventDefault();
        setIsOpen(false);

        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen
                    ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg border-b border-white/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="text-2xl font-bold gradient-text"
                    >
                        Portfolio
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((navItem, index) => (
                            <motion.a
                                key={navItem.name}
                                href={navItem.href}
                                onClick={(e) => scrollToSection(e, navItem.href)}
                                className={`transition-colors relative font-medium ${activeSection === navItem.href.replace('#', '')
                                        ? 'text-white'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {navItem.name}
                                {activeSection === navItem.href.replace('#', '') && (
                                    <motion.span
                                        layoutId="activeTab"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                                    />
                                )}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-sm hover:shadow-[0_0_20px_rgba(131,56,236,0.4)] transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl p-2 text-white"
                        onClick={() => setIsOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                style={{ background: 'rgba(10, 10, 10, 0.98)' }}
            >
                <div className="px-4 py-4 space-y-1 border-t border-white/5">
                    {navItems.map((navItem) => (
                        <a
                            key={navItem.name}
                            href={navItem.href}
                            onClick={(e) => scrollToSection(e, navItem.href)}
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeSection === navItem.href.replace('#', '')
                                    ? 'text-white bg-white/10'
                                    : 'text-white/60 active:text-white active:bg-white/5'
                                }`}
                        >
                            {navItem.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="block w-full px-4 py-3 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-center text-sm"
                    >
                        Hire Me
                    </a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
