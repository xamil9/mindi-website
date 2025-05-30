import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer className="bg-white text-gray-600 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Section - Centered Logo and Social Icons */}
                <motion.div
                    className="flex flex-col items-center mb-4 pb-4 border-b border-gray-200"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={staggerContainer}
                >
                    {/* Logo and Tagline */}
                    <motion.div className="flex flex-col items-center mb-2" variants={staggerItem}>
                        <img
                            src="/mindi-logo.svg"
                            alt="MINDI.tv"
                            className="h-36 w-auto mb-1"
                        />
                        <span className="text-3xl text-gray-500">Show the World</span>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div className="flex gap-4" variants={staggerItem}>
                        <motion.a
                            href="https://twitter.com/mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://instagram.com/mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://linkedin.com/company/mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://youtube.com/mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://tiktok.com/@mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://threads.net/@mindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.587-4.449-.012-.33-.024-.632-.024-.88 0-.734-.098-1.339-.29-1.794-.185-.437-.42-.699-.877-.699-.405 0-.715.221-.91.627a2.33 2.33 0 0 0-.298.898l-.002.02-.385 4.779h-2.117l.205-2.584c-.288.338-.611.63-.97.872a3.68 3.68 0 0 1-1.89.511c-1.063 0-1.973-.366-2.703-1.09-.714-.71-1.076-1.7-1.076-2.94 0-.893.197-1.692.585-2.376.397-.7.98-1.248 1.732-1.63a5.38 5.38 0 0 1 2.52-.586c1.361 0 2.429.422 3.177 1.253.129.144.247.295.354.454.112-.48.328-.926.641-1.325.602-.77 1.484-1.16 2.619-1.16 1.073 0 1.978.377 2.69 1.12.731.757 1.103 1.79 1.103 3.07 0 .26.012.575.024.944.033 1.002.065 2.58-1.851 4.456-1.745 1.706-3.714 2.488-6.622 2.513zM11.39 9.388c-.877 0-1.576.253-2.078.753-.483.48-.73 1.152-.73 1.996 0 .568.133 1.034.395 1.386.264.353.656.532 1.166.532.683 0 1.214-.283 1.58-.842.368-.56.564-1.36.58-2.376l.013-.148c-.283-.89-1.044-1.301-1.926-1.301z" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Middle Section - Navigation Links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 mb-4 pb-4 border-b border-gray-200"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    {/* Company Links */}
                    <motion.div className="flex gap-6" variants={staggerItem}>
                        <a href="/" className="text-sm hover:text-blue-600 transition-colors">
                            Home
                        </a>
                        <a href="/contact" className="text-sm hover:text-blue-600 transition-colors">
                            Contact
                        </a>
                    </motion.div>

                    <span className="hidden md:inline text-gray-400">•</span>

                    {/* Services Links */}
                    <motion.div className="flex gap-6" variants={staggerItem}>
                        <a href="/filmmakers" className="text-sm hover:text-blue-600 transition-colors">
                            For Filmmakers
                        </a>
                        <a href="/partners" className="text-sm hover:text-blue-600 transition-colors">
                            For Partners
                        </a>
                        <a href="/viewers" className="text-sm hover:text-blue-600 transition-colors">
                            For Viewers
                        </a>
                    </motion.div>

                    <span className="hidden md:inline text-gray-400">•</span>

                    {/* Resources Links */}
                    <motion.div className="flex gap-6" variants={staggerItem}>
                        <a href="https://substack.mindi.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 transition-colors">
                            Our Substack
                        </a>
                        <a href="/help" className="text-sm hover:text-blue-600 transition-colors">
                            Help Center
                        </a>
                    </motion.div>

                    <span className="hidden md:inline text-gray-400">•</span>

                    {/* Legal Links */}
                    <motion.div className="flex gap-6" variants={staggerItem}>
                        <a href="/partner-agreement" className="text-sm hover:text-blue-600 transition-colors">
                            Partner Program Agreement
                        </a>
                    </motion.div>
                </motion.div>

                {/* Bottom Section - Policy Links and Copyright */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex flex-wrap gap-6 text-sm">
                        <a href="/privacy" className="hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="/referral" className="hover:text-blue-600 transition-colors">
                            Referral Policy
                        </a>
                        <a href="/terms" className="hover:text-blue-600 transition-colors">
                            Terms of Service
                        </a>
                    </div>

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Mindi.tv inc. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}