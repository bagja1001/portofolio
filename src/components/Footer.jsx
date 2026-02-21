import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/bagja1001', label: 'GitHub' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/miftasubagja/', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://www.instagram.com/miftasubagja', label: 'Instagram' },
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="relative overflow-hidden bg-black/30 backdrop-blur-sm border-t border-white/10">
            {/* Background Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
                        <p className="text-white/70 mb-4">
                            Creating beautiful and functional digital experiences with passion
                            and dedication.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={label}
                                >
                                    <Icon className="text-lg" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <motion.a
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors inline-block"
                                        whileHover={{ x: 5 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-8 border-t border-white/10 text-center"
                >
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} Mifta Subagja. All rights reserved.
                    </p>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </motion.button>
        </footer>
    );
};

export default Footer;
