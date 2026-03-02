import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden'>
        {/* Abstract background pulses */}
        <motion.div
            animate={{
                scale: [1, 1.5, 1],
                opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lemon rounded-full blur-[160px]'
        />

        <div className='relative'>
            {/* Pulsing ring */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className='absolute -inset-8 bg-lemon rounded-full blur-2xl'
            />

            {/* Main spinner */}
            <div className='w-24 h-24 border-2 border-white/5 rounded-full relative overflow-hidden'>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className='absolute inset-0 border-t-2 border-lemon rounded-full shadow-[0_0_15px_rgba(227,255,0,0.5)]'
                />
            </div>

            {/* Center icon */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className='w-1.5 h-1.5 bg-lemon rounded-full shadow-[0_0_20px_#e3ff00]'
                />
            </div>
        </div>

        <div className='mt-12 text-center relative z-10'>
            <h2 className='text-4xl font-black italic uppercase tracking-tighter text-white mb-2'>
                Establishing <span className='text-lemon'>Uplink</span>
            </h2>
            <div className='flex items-center justify-center space-x-1.5'>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            height: ["4px", "12px", "4px"],
                            opacity: [0.2, 1, 0.2],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15
                        }}
                        className='w-1 bg-lemon rounded-full'
                    />
                ))}
            </div>
            <p className='mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 animate-pulse'>
                Syncing secure data packets...
            </p>
        </div>
    </div>
);

export default LoadingSpinner;
