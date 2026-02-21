import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import profileImg from '../assets/profil/profile.png';

const Hero = () => {
    const roles = ['Frontend Developer', 'Web Developer', 'React Developer'];
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && text === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(() => {
                setText(isDeleting
                    ? currentRole.substring(0, text.length - 1)
                    : currentRole.substring(0, text.length + 1)
                );
            }, isDeleting ? 50 : 100);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-600/25 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/25 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-20">

                {/* Left Side - Text Content */}
                <motion.div
                    className="flex-1 text-center lg:text-left"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Greeting */}
                    <motion.div variants={item} className="mb-4">
                        <span className="inline-block px-6 py-2 glass rounded-full text-sm font-medium">
                            👋 Welcome to my portfolio
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={item}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                    >
                        Hi, I'm{' '}
                        <span className="gradient-text">Mifta Subagja</span>
                    </motion.h1>

                    {/* Role - Typewriter Animation */}
                    <motion.div variants={item} className="mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                            <span
                                className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                                style={{
                                    backgroundSize: '200% 200%',
                                    animation: 'gradientShift 3s ease infinite'
                                }}
                            >
                                {text}
                            </span>
                            <span className="inline-block w-[3px] h-[1em] bg-purple-400 ml-1 animate-pulse align-middle" />
                        </h2>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={item}
                        className="text-base md:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-10"
                    >
                        I craft beautiful, functional, and user-centric digital experiences.
                        Passionate about turning ideas into reality with clean code and
                        elegant design.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-10"
                    >
                        <motion.button
                            className="btn-primary flex items-center gap-2 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View My Work
                        </motion.button>
                        <motion.a
                            href="/cv.pdf"
                            download
                            className="px-6 sm:px-8 py-3 rounded-full glass hover:bg-white/15 transition-all duration-300 font-semibold flex items-center gap-2 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📄 Download CV
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={item}
                        className="flex gap-5 justify-center lg:justify-start"
                    >
                        {[
                            { icon: FaGithub, href: 'https://github.com/bagja1001', label: 'GitHub' },
                            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/miftasubagja/', label: 'LinkedIn' },
                            { icon: FaInstagram, href: 'https://www.instagram.com/miftasubagja', label: 'Instagram' },
                        ].map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={label}
                            >
                                <Icon className="text-xl" />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Profile Image */}
                <motion.div
                    className="flex-shrink-0 order-first lg:order-last relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {/* Glow behind */}
                    <div className="absolute inset-0 bg-purple-900/40 blur-3xl scale-125 rounded-full" />

                    {/* Profile Image */}
                    <div className="relative w-64 sm:w-72 lg:w-80 mx-auto">
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-full h-auto object-contain relative z-10"
                            style={{
                                maskImage: 'radial-gradient(ellipse 55% 65% at center 40%, black 20%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at center 40%, black 20%, transparent 70%)',
                            }}
                        />
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;
