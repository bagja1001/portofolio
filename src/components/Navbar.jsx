import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = ['home', 'about', 'services', 'projects', 'contact'];
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 100) {
                    setActiveSection(id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="text-2xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Portfolio
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`transition-colors relative group ${activeSection === item.href.replace('#', '')
                                    ? 'text-white'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                {item.name}
                                {/* Active indicator */}
                                <motion.span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden glass"
            >
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`block transition-colors py-2 ${activeSection === item.href.replace('#', '')
                                ? 'text-white font-semibold'
                                : 'text-white/80 hover:text-white'
                                }`}
                            whileHover={{ x: 10 }}
                        >
                            {item.name}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="block w-full px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Hire Me
                    </motion.a>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
