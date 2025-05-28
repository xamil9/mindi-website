import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const AccountMenu = ({ onCreateAccount, onSignIn, onSignOut, isAuthenticated, onOpenDashboard }) => { // ADD onOpenDashboard HERE
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleMenu}
                className="p-2 rounded-full border border-white hover:bg-white/10 transition"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6 text-white" />
                ) : (
                    isAuthenticated ?
                        <UserCircleIcon className="h-6 w-6 text-white" /> :
                        <Bars3Icon className="h-6 w-6 text-white" />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-md w-40 py-2">
                    {!isAuthenticated ? (
                        <>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setIsOpen(false);
                                    onSignIn();
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                id="createAccountButton"
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setIsOpen(false);
                                    onCreateAccount();
                                }}
                            >
                                Create Account
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="block w-full text-left px-4 py-2 font-medium">
                                My Account
                            </div>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => console.log('Profile clicked')}
                            >
                                Profile
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => console.log('Settings clicked')}
                            >
                                Settings
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    console.log('Filmmaker Dashboard clicked'); // ADD THIS FOR DEBUGGING
                                    setIsOpen(false);
                                    if (onOpenDashboard) {
                                        onOpenDashboard();
                                    } else {
                                        console.error('onOpenDashboard prop not passed to AccountMenu');
                                    }
                                }}
                            >
                                Filmmaker Dashboard
                            </button>
                        </>
                    )}
                    <hr className="my-1" />
                    {isAuthenticated && (
                        <button
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={() => {
                                setIsOpen(false);
                                onSignOut();
                            }}
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AccountMenu;