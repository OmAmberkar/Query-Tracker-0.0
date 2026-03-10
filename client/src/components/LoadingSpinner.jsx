import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const LoadingSpinner = () => {
    const subtitleRef = useRef(null);
    const targetText = "Syncing source transmissions...";

    useEffect(() => {
        let iteration = 0;
        let interval = null;
        const letters = "ABCDEFGHIJKLMN0123456789!@#$%^&*";

        const startScramble = () => {
            clearInterval(interval);
            iteration = 0;
            interval = setInterval(() => {
                if (!subtitleRef.current) return;
                subtitleRef.current.innerText = targetText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= targetText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        };

        startScramble();
        const mainInterval = setInterval(startScramble, 4000);

        return () => {
            clearInterval(interval);
            clearInterval(mainInterval);
        };
    }, []);

    return (
        <div className='min-h-screen bg-bg-deep flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans'>
            {/* Abstract background pulses */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.05, 0.2, 0.05]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[160px]'
            />

            <div className='relative'>
                {/* Pulsing ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className='absolute -inset-8 bg-primary rounded-full blur-2xl'
                />

                {/* Main spinner */}
                <div className='w-24 h-24 border-2 border-primary/10 rounded-full relative overflow-hidden'>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className='absolute inset-0 border-t-2 border-primary rounded-full shadow-primary-glow'
                    />
                </div>

                {/* Center icon */}
                <div className='absolute inset-0 flex items-center justify-center'>
                    <motion.div
                        animate={{ scale: [1, 2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className='w-1.5 h-1.5 bg-primary rounded-full shadow-primary-glow'
                    />
                </div>
            </div>

            <div className='mt-12 text-center relative z-10'>
                <h2 className='text-4xl font-black italic uppercase tracking-tighter text-text-main mb-2 font-tech'>
                    Establishing <span className='text-primary'>Uplink</span>
                </h2>
                <div className='flex items-center justify-center space-x-1.5'>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: ["4px", "24px", "4px"],
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className='w-1 bg-primary rounded-full shadow-primary-glow'
                        />
                    ))}
                </div>
                <p
                    ref={subtitleRef}
                    className='mt-8 text-[12px] font-black uppercase tracking-[0.6em] text-primary min-h-[1em]'
                >
                    {targetText}
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
