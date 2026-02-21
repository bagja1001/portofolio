import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FaCode,
    FaMobile,
    FaCss3Alt,
    FaDatabase,
    FaBolt,
    FaRocket
} from 'react-icons/fa';

const Services = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const services = [
        {
            icon: FaCode,
            title: 'Web Development',
            description: 'Building responsive and performant web applications using modern frameworks and best practices.',
            gradient: 'from-blue-500 to-cyan-500',
            features: ['React/Next.js', 'Vue.js', 'TypeScript'],
        },
        {
            icon: FaMobile,
            title: 'Responsive Design',
            description: 'Creating pixel-perfect layouts that adapt beautifully across all screen sizes and devices.',
            gradient: 'from-purple-500 to-pink-500',
            features: ['Mobile-First', 'Cross-Browser', 'Adaptive UI'],
        },
        {
            icon: FaCss3Alt,
            title: 'Modern CSS & Styling',
            description: 'Crafting visually stunning interfaces with modern CSS techniques, animations, and frameworks.',
            gradient: 'from-green-500 to-emerald-500',
            features: ['Tailwind CSS', 'SCSS/SASS', 'CSS Modules'],
        },
        {
            icon: FaDatabase,
            title: 'API Integration',
            description: 'Connecting frontend applications with backend services, REST APIs, and third-party data sources.',
            gradient: 'from-orange-500 to-red-500',
            features: ['REST API', 'Axios/Fetch', 'JSON Data'],
        },
        {
            icon: FaBolt,
            title: 'Performance Optimization',
            description: 'Optimizing web apps for lightning-fast load times, smooth interactions, and great Core Web Vitals.',
            gradient: 'from-yellow-500 to-orange-500',
            features: ['Lazy Loading', 'Code Splitting', 'SEO'],
        },
        {
            icon: FaRocket,
            title: 'Animation & Motion',
            description: 'Adding life to interfaces with smooth animations, transitions, and interactive micro-interactions.',
            gradient: 'from-cyan-500 to-blue-500',
            features: ['Framer Motion', 'GSAP', 'CSS Animations'],
        },
    ];

    return (
        <section id="services" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/2 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-20 -left-10 w-72 h-72 bg-green-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Services & Expertise</h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Delivering beautiful and performant frontend solutions
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <motion.div
                                className="glass rounded-2xl p-8 h-full relative overflow-hidden"
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Gradient Overlay on Hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                />

                                {/* Icon */}
                                <motion.div
                                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 relative z-10`}
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <service.icon className="text-3xl text-white" />
                                </motion.div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-white/70 mb-4">{service.description}</p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature, idx) => (
                                            <motion.span
                                                key={feature}
                                                className="px-3 py-1 text-sm bg-white/10 rounded-full"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                                transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative Corner */}
                                <motion.div
                                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300`}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-white/70 mb-6">
                        Ready to bring your ideas to life?
                    </p>
                    <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Let's Work Together
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
