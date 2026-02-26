import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useState, useRef } from 'react';
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
        honeypot: '', // hidden field — harus selalu kosong
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const lastSubmitTime = useRef(null); // untuk rate limiting

    // ── Validasi ──────────────────────────────────────────────
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    // Deteksi karakter berbahaya / spam link
    const SPAM_REGEX = /(<script|http:\/\/|https:\/\/|www\.|onclick|onerror|javascript:)/i;

    // Domain abal-abal / disposable yang diblacklist
    const BLOCKED_DOMAINS = [
        // Domain test / placeholder
        'test.com', 'fake.com', 'example.com', 'sample.com', 'dummy.com',
        'asdf.com', 'qwerty.com', 'abc.com', 'aaa.com', 'bbb.com', 'ccc.com',
        'xxx.com', 'yyy.com', 'zzz.com', '1234.com', 'abcd.com',
        // Email disposable populer
        'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
        'trashmail.com', 'sharklasers.com', 'guerrillamailblock.com',
        'yopmail.com', 'maildrop.cc', 'dispostable.com', 'spamgourmet.com',
        'spamgourmet.net', 'spamgourmet.org', 'spamdecoy.net', 'spamfree24.org',
        'getairmail.com', 'jetable.fr.nf', 'filzmail.com', 'throwam.com',
        'fakeinbox.com', 'spam4.me', 'discard.email', 'spambog.com',
        'mytemp.email', 'tempinbox.com', '10minutemail.com', '10minutemail.net',
        'temp-mail.org', 'burnermail.io', 'throwaway.email', 'getnada.com',
        'mailnull.com', 'deadaddress.com', 'spamgmail.com', 'nobulk.com',
    ];

    const validate = (data = formData) => {
        const newErrors = {};

        // Nama
        if (!data.name.trim()) {
            newErrors.name = 'Nama tidak boleh kosong.';
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Nama minimal 2 karakter.';
        } else if (data.name.trim().length > 60) {
            newErrors.name = 'Nama maksimal 60 karakter.';
        } else if (SPAM_REGEX.test(data.name)) {
            newErrors.name = 'Nama mengandung karakter tidak valid.';
        }

        // Email
        if (!data.email.trim()) {
            newErrors.email = 'Email tidak boleh kosong.';
        } else if (data.email.trim().length < 10) {
            newErrors.email = 'Email minimal 10 karakter.';
        } else if (!EMAIL_REGEX.test(data.email.trim())) {
            newErrors.email = 'Format email tidak valid.';
        } else if (data.email.trim().length > 100) {
            newErrors.email = 'Email terlalu panjang.';
        } else {
            const domain = data.email.trim().toLowerCase().split('@')[1];
            if (BLOCKED_DOMAINS.includes(domain)) {
                newErrors.email = 'Gunakan email asli kamu (domain tidak diizinkan).';
            }
        }

        // Subject
        if (!data.subject.trim()) {
            newErrors.subject = 'Subject tidak boleh kosong.';
        } else if (data.subject.trim().length < 3) {
            newErrors.subject = 'Subject minimal 3 karakter.';
        } else if (data.subject.trim().length > 100) {
            newErrors.subject = 'Subject maksimal 100 karakter.';
        } else if (SPAM_REGEX.test(data.subject)) {
            newErrors.subject = 'Subject mengandung konten tidak valid.';
        }

        // Pesan
        if (!data.message.trim()) {
            newErrors.message = 'Pesan tidak boleh kosong.';
        } else if (data.message.trim().length < 10) {
            newErrors.message = 'Pesan minimal 10 karakter.';
        } else if (data.message.trim().length > 2000) {
            newErrors.message = 'Pesan maksimal 2000 karakter.';
        } else if (SPAM_REGEX.test(data.message)) {
            newErrors.message = 'Pesan mengandung konten tidak diperbolehkan (link/script).';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🍯 Honeypot: jika field tersembunyi terisi → bot
        if (formData.honeypot) return;

        // ⏱ Rate limiting: 1 pengiriman per 60 detik
        const now = Date.now();
        if (lastSubmitTime.current && now - lastSubmitTime.current < 60000) {
            const sisaDetik = Math.ceil((60000 - (now - lastSubmitTime.current)) / 1000);
            setErrors({ form: `Tunggu ${sisaDetik} detik sebelum mengirim pesan lagi.` });
            return;
        }

        // ✅ Validasi semua field
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setStatus('sending');

        try {
            await emailjs.send(
                'service_portfolio',
                'template_contact',
                {
                    from_name: formData.name.trim(),
                    from_email: formData.email.trim().toLowerCase(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                    to_email: 'miftasubagja10@gmail.com',
                },
                'YOUR_PUBLIC_KEY'
            );

            lastSubmitTime.current = Date.now();
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e) => {
        const updated = { ...formData, [e.target.name]: e.target.value };
        setFormData(updated);
        // Hapus error field yang sedang diketik (real-time)
        if (errors[e.target.name]) {
            const newErrors = { ...errors };
            delete newErrors[e.target.name];
            setErrors(newErrors);
        }
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
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl" noValidate>
                            {/* 🍯 Honeypot field — disembunyikan dari user, akan terisi jika bot */}
                            <input
                                type="text"
                                name="honeypot"
                                value={formData.honeypot}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                tabIndex="-1"
                                autoComplete="off"
                            />

                            <div className="space-y-5">
                                {/* Error global (rate limit) */}
                                {errors.form && (
                                    <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-4 py-3 rounded-xl text-sm">
                                        <FaExclamationCircle className="flex-shrink-0" />
                                        <span>{errors.form}</span>
                                    </div>
                                )}

                                {/* Nama */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Nama Kamu <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        maxLength={60}
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-colors ${errors.name
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-white/20 focus:border-cyan-500'
                                            }`}
                                        placeholder="Masukkan nama"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                            <FaExclamationCircle /> {errors.name}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Email */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Kamu <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        maxLength={100}
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-colors ${errors.email
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-white/20 focus:border-cyan-500'
                                            }`}
                                        placeholder="email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                            <FaExclamationCircle /> {errors.email}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Subject */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        maxLength={100}
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-colors ${errors.subject
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-white/20 focus:border-cyan-500'
                                            }`}
                                        placeholder="Tentang apa?"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                            <FaExclamationCircle /> {errors.subject}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Pesan */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="message" className="block text-sm font-medium">
                                            Pesan <span className="text-red-400">*</span>
                                        </label>
                                        <span className={`text-xs ${formData.message.length > 1800 ? 'text-red-400' : 'text-white/40'}`}>
                                            {formData.message.length}/2000
                                        </span>
                                    </div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        maxLength={2000}
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-colors resize-none ${errors.message
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-white/20 focus:border-cyan-500'
                                            }`}
                                        placeholder="Ceritakan tentang project kamu..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                            <FaExclamationCircle /> {errors.message}
                                        </p>
                                    )}
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

                                {/* Send Error */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl text-sm"
                                    >
                                        <FaExclamationCircle />
                                        <span>Gagal mengirim pesan. Coba lagi atau hubungi via email langsung.</span>
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
