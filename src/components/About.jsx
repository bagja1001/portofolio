import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaMobileAlt, FaRocket, FaLightbulb, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaNpm } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer, SiVercel } from 'react-icons/si';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'NPM', icon: FaNpm, color: '#CB3837' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
        { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
    ];

    const features = [
        {
            icon: FaCode,
            title: 'Clean Code',
            description: 'Writing maintainable, scalable, and efficient code',
        },
        {
            icon: FaMobileAlt,
            title: 'Responsive Design',
            description: 'Pixel-perfect layouts on all screen sizes',
        },
        {
            icon: FaRocket,
            title: 'Fast Performance',
            description: 'Optimizing for speed and user experience',
        },
        {
            icon: FaLightbulb,
            title: 'Problem Solving',
            description: 'Finding innovative solutions to complex challenges',
        },
    ];

    return (
        <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">About Me</h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Passionate developer with a keen eye for design and a love for creating
                        exceptional digital experiences.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <motion.div
                                className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <feature.icon className="text-2xl text-white" />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-white/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass p-8 rounded-2xl"
                >
                    <h3 className="text-3xl font-bold mb-8 text-center">
                        <span className="gradient-text">Technical Skills</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="glass p-4 rounded-xl flex flex-col items-center gap-3 group cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <skill.icon
                                        className="text-4xl transition-all duration-300 group-hover:drop-shadow-lg"
                                        style={{ color: skill.color }}
                                    />
                                </motion.div>
                                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
