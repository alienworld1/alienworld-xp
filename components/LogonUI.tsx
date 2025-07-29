'use client';

import { motion } from 'framer-motion';

interface LogonUIProps {
  onLogin: () => void;
}

export default function LogonUI({ onLogin }: LogonUIProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hills" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><polygon fill="%23ffffff" fill-opacity="0.1" points="0,100 20,80 40,90 60,70 80,85 100,75 100,100"/></pattern></defs><rect width="100" height="100" fill="url(%23hills)"/></svg>')`,
      }}
    >
      <div className="text-center">
        {/* Windows XP Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-7xl font-bold text-white mb-4">
            <span className="text-red-500">alienworld</span>{' '}
            <span className="text-yellow-400">XP</span>
          </div>
        </motion.div>

        {/* Placeholder Login Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-white bg-opacity-90 rounded-lg p-8 shadow-2xl max-w-md mx-auto"
        >
          <div className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome to alienworld xp
          </div>

          <div className="text-gray-600 mb-8">
            logonui.exe is still in development
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 shadow-md"
          >
            login
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-80"
        >
          Press Ctrl+Alt+Delete to log on
        </motion.div>
      </div>
    </motion.div>
  );
}
