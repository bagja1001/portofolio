import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import quizImg from '../assets/project/quiz.png';
import todoImg from '../assets/project/todolist.png';
import landingImg from '../assets/project/landing pages.png';
import newsImg from '../assets/project/news.png';

const Projects = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const projects = [
        {
            title: 'Quiz Film',
            description: 'Aplikasi kuis interaktif bertema film dengan pertanyaan pilihan ganda, sistem skor, dan UI yang menarik.',
            image: quizImg,
            tags: ['React', 'JavaScript', 'CSS', 'Vercel'],
            github: 'https://github.com/bagja1001',
            demo: 'https://quiz-film.vercel.app/',
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'To-Do List',
            description: 'Aplikasi manajemen tugas sederhana dan elegan untuk mencatat, mengelola, dan menyelesaikan aktivitas harian.',
            image: todoImg,
            tags: ['React', 'JavaScript', 'CSS', 'Vercel'],
            github: 'https://github.com/bagja1001',
            demo: 'https://to-do-list-nu-opal-68.vercel.app/',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'Landing Pages',
            description: 'Halaman landing page modern dan responsif dengan desain yang clean dan profesional.',
            image: landingImg,
            tags: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://github.com/bagja1001',
            demo: 'https://landing-pages-1r3e.vercel.app/',
            color: 'from-blue-500 to-indigo-500',
        },
        {
            title: 'News App',
            description: 'Aplikasi berita dengan tampilan yang rapi untuk membaca berita terkini dari berbagai sumber.',
            image: newsImg,
            tags: ['React', 'API', 'CSS'],
            github: 'https://github.com/bagja1001',
            demo: 'https://news-api-fawn-seven.vercel.app/',
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -50, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 -left-20 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">My Projects</h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Berikut beberapa project yang sudah saya buat untuk mengasah skill frontend development.
                    </p>
                </motion.div>

                {/* Projects Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="glass rounded-2xl overflow-hidden group"
                        >
                            {/* Project Image */}
                            <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaGithub className="text-xl" />
                                    </motion.a>
                                    <motion.a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaExternalLinkAlt className="text-xl" />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                <p className="text-white/70 mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            className="px-3 py-1 text-sm bg-white/10 rounded-full"
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Live Demo Link */}
                                <motion.a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                                    whileHover={{ x: 5 }}
                                >
                                    Live Demo <FaExternalLinkAlt className="text-sm" />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
