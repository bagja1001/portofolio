import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await emailjs.send(
                'service_portfolio', // Service ID - perlu setup di emailjs.com
                'template_contact',  // Template ID - perlu setup di emailjs.com
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'miftasubagja10@gmail.com',
                },
                'YOUR_PUBLIC_KEY' // Public Key - perlu setup di emailjs.com
            );

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: FaInstagram,
            title: 'Instagram',
            value: '@miftasubagja',
            href: 'https://www.instagram.com/miftasubagja',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Location',
            value: 'Indonesia',
            href: '#',
        },
    ];

    return (
        <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
                    className="absolute top-20 -right-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/3 -left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        y: [0, 30, 0],
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
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Punya project atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold mb-8">
                            <span className="gradient-text">Mari Berkolaborasi</span>
                        </h3>
                        <p className="text-white/70 mb-8">
                            Saya selalu terbuka untuk mendiskusikan project baru, ide kreatif,
                            atau kesempatan untuk belajar dan berkembang bersama.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.title}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? '_blank' : undefined}
                                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 glass p-4 rounded-xl group"
                                >
                                    <motion.div
                                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <info.icon className="text-xl" />
                                    </motion.div>
                                    <div>
                                        <div className="text-sm text-white/60">{info.title}</div>
                                        <div className="font-semibold">{info.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Decorative */}
                        <motion.div
                            className="mt-12 relative h-48 glass rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <span className="text-5xl">🤝</span>
                                <span className="text-white/60 text-sm font-medium">Let's build something great!</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl">
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Nama Kamu
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="Masukkan nama"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Kamu
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="Tentang apa?"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Pesan
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                        placeholder="Ceritakan tentang project kamu..."
                                        required
                                    />
                                </motion.div>

                                {/* Success Message */}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-xl"
                                    >
                                        <FaCheckCircle />
                                        <span>Pesan berhasil dikirim! Terima kasih! 🎉</span>
                                    </motion.div>
                                )}

                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
                                    >
                                        Gagal mengirim pesan. Coba lagi atau hubungi via email langsung.
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <FaPaperPlane className={status === 'sending' ? 'animate-bounce' : ''} />
                                    {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
