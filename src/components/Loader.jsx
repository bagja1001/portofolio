import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    setTimeout(() => onLoadingComplete(), 500);
                    return 100;
                }
                const diff = Math.random() * 30;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="loader-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Loader Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Circular Loader */}
                <div className="relative">
                    <motion.div
                        className="loader"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        <div className="text-3xl font-bold gradient-text">
                            {Math.round(progress)}%
                        </div>
                    </motion.div>
                </div>

                {/* Loading Text */}
                <motion.div
                    className="mt-8 text-xl font-semibold text-white/80"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    Loading Portfolio
                </motion.div>

                {/* Progress Bar */}
                <div className="progress-bar mt-6">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-cyan-400 rounded-full"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
