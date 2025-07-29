'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BootAnimationProps {
  onBootComplete: () => void;
}

export default function BootAnimation({ onBootComplete }: BootAnimationProps) {
  const [currentStage, setCurrentStage] = useState<
    'bios' | 'xp-boot' | 'complete'
  >('bios');
  const [biosStep, setBiosStep] = useState(0);

  // BIOS messages simulation
  const biosMessages = [
    'Phoenix BIOS 4.0 Release 6.0',
    'Copyright 1985-2001 Phoenix Technologies Ltd.',
    'All Rights Reserved',
    '',
    '',
    `     ___      _ _ _               
    / _ \\    | (_) |              
   / /_\\ \\ __| |_| |_ _   _  __ _ 
   |  _  |/ _\` | | __| | | |/ _\` |
   | | | | (_| | | |_| |_| | (_| |
   \\_| |_/\\__,_|_|\\__|\\__, |\\__,_|
                       __/ |      
                      |___/       `,
    '',
    'Initializing...',
    '',
    'Processor: Intel(R) Pentium(R) 4 CPU 2.80GHz',
    'Memory Test: 512MB OK',
    'Primary Master: 80GB IDE Hard Drive',
    'Primary Slave: CD-ROM Drive',
    '',
    'Press DEL to enter SETUP',
    '',
    'Loading alienworld XP...',
  ];

  useEffect(() => {
    // BIOS sequence
    const biosTimer = setInterval(() => {
      setBiosStep(prev => {
        if (prev >= biosMessages.length - 1) {
          clearInterval(biosTimer);
          setTimeout(() => setCurrentStage('xp-boot'), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    // Cleanup on unmount
    return () => clearInterval(biosTimer);
  }, []);

  useEffect(() => {
    if (currentStage === 'xp-boot') {
      // Boot sequence lasts about 8-10 seconds like real XP
      const timer = setTimeout(() => {
        setCurrentStage('complete');
        setTimeout(onBootComplete, 1000);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [currentStage, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStage === 'bios' && (
          <motion.div
            key="bios"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 font-mono text-sm leading-tight"
          >
            {biosMessages.slice(0, biosStep + 1).map((message, index) => (
              <pre
                key={index}
                className={`${index < 3 ? 'text-white' : 'text-gray-300'} whitespace-pre-wrap`}
              >
                {message || '\u00A0'}
              </pre>
            ))}

            {biosStep >= biosMessages.length - 2 && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="mt-4"
              >
                _
              </motion.div>
            )}
          </motion.div>
        )}

        {currentStage === 'xp-boot' && (
          <motion.div
            key="xp-boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full bg-black relative"
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            {/* Windows XP Logo and Progress Bar - Centered together */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center mb-12"
              >
                {/* Windows Logo */}
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/images/windows-boot-logo.png"
                    alt="Windows XP Logo"
                    width={400}
                    height={200}
                  />
                </div>
              </motion.div>

              {/* Authentic XP Progress Bar - Closer to logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {/* Progress bar container - exactly 155px wide x 12px tall */}
                <div
                  className="relative bg-black border border-gray-600 overflow-hidden"
                  style={{
                    width: '155px',
                    height: '12px',
                    backgroundColor: '#000000',
                    border: '1px solid #404040',
                    boxShadow: 'inset 1px 1px 1px rgba(128,128,128,0.3)',
                  }}
                >
                  {/* Moving segments - 3 blue-green blocks */}
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="absolute top-0 h-full"
                      style={{
                        width: '15px',
                        height: '10px',
                        top: '1px',
                        background:
                          'linear-gradient(to bottom, #2335c8, #88a0f0, #2335c8)',
                      }}
                      animate={{
                        x: [-20, 160],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Copyright text - Bottom left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute bottom-4 left-4 text-white text-xs"
              style={{
                fontFamily: 'Tahoma, sans-serif',
              }}
            >
              Copyright © Microsoft Corporation
            </motion.div>

            {/* Microsoft Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute bottom-4 right-4"
            >
              <Image
                src="/images/microsoft-logo.png"
                alt="Microsoft Logo"
                width={60}
                height={20}
              />
            </motion.div>
          </motion.div>
        )}

        {currentStage === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div
                className="text-white text-3xl font-normal"
                style={{
                  fontFamily: 'Tahoma, sans-serif',
                }}
              >
                Welcome
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
