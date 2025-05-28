// src/components/FirebaseTestPanel.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FirebaseTestPanel = () => {
    const [logs, setLogs] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Get all auth functions directly
    const {
        currentUser,
        signup,
        login,
        logout,
        getUserProfile,
        updatePremiumStatus
    } = useAuth();

    // Add a log entry
    const addLog = (message, type = 'info') => {
        setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
    };

    // Clear logs
    const clearLogs = () => setLogs([]);

    // Test signup
    const testSignup = async () => {
        if (!email || !password) {
            addLog('Email and password are required', 'error');
            return;
        }

        try {
            addLog(`Testing signup with email: ${email}`, 'info');
            const user = await signup(email, password);
            addLog(`Signup successful. User ID: ${user.uid}`, 'success');
        } catch (error) {
            addLog(`Signup failed: ${error.message}`, 'error');
        }
    };

    // Test login
    const testLogin = async () => {
        if (!email || !password) {
            addLog('Email and password are required', 'error');
            return;
        }

        try {
            addLog(`Testing login with email: ${email}`, 'info');
            const result = await login(email, password);
            addLog(`Login successful. User ID: ${result.user.uid}`, 'success');
        } catch (error) {
            addLog(`Login failed: ${error.message}`, 'error');
        }
    };

    // Test logout
    const testLogout = async () => {
        try {
            addLog('Testing logout', 'info');
            await logout();
            addLog('Logout successful', 'success');
        } catch (error) {
            addLog(`Logout failed: ${error.message}`, 'error');
        }
    };

    // Test get profile
    const testGetProfile = async () => {
        try {
            addLog('Getting user profile...', 'info');
            const profile = await getUserProfile();

            if (profile) {
                addLog(`Profile retrieved: ${JSON.stringify(profile)}`, 'success');
            } else {
                addLog('No profile found. User might not be logged in.', 'warning');
            }
        } catch (error) {
            addLog(`Get profile failed: ${error.message}`, 'error');
        }
    };

    // Test premium status
    const testSetPremium = async (status) => {
        try {
            addLog(`Setting premium status to: ${status}`, 'info');
            await updatePremiumStatus(status);
            addLog('Premium status updated successfully', 'success');

            // Verify the change
            const profile = await getUserProfile();
            addLog(`Verified premium status: ${profile?.isPremium ? 'Premium' : 'Free'}`,
                profile?.isPremium === status ? 'success' : 'error');
        } catch (error) {
            addLog(`Update premium status failed: ${error.message}`, 'error');
        }
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 hover:bg-blue-700"
            >
                Test Firebase
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">Firebase Test Panel</h2>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-grow">
                    <div className="space-y-4">
                        <div className="border rounded p-3">
                            <h3 className="font-medium mb-2">Authentication Tests</h3>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="border p-2 rounded text-sm"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="border p-2 rounded text-sm"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={testSignup}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                >
                                    Test Signup
                                </button>
                                <button
                                    onClick={testLogin}
                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                >
                                    Test Login
                                </button>
                                <button
                                    onClick={testLogout}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                >
                                    Test Logout
                                </button>
                                <button
                                    onClick={testGetProfile}
                                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                >
                                    Get Profile
                                </button>
                            </div>
                        </div>

                        <div className="border rounded p-3">
                            <h3 className="font-medium mb-2">Premium Status Tests</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => testSetPremium(true)}
                                    className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700"
                                >
                                    Set Premium
                                </button>
                                <button
                                    onClick={() => testSetPremium(false)}
                                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                                >
                                    Set Free
                                </button>
                            </div>
                        </div>

                        <div className="border rounded p-3">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Test Logs</h3>
                                <button
                                    onClick={clearLogs}
                                    className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Clear
                                </button>
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-2 rounded h-40 overflow-y-auto font-mono text-xs">
                                {logs.length === 0 ? (
                                    <p className="text-gray-400">No logs yet. Run some tests to see results here.</p>
                                ) : (
                                    logs.map((log, index) => (
                                        <div key={index} className="mb-1">
                                            <span className="text-gray-400">[{log.time}]</span>{' '}
                                            <span
                                                className={
                                                    log.type === 'error'
                                                        ? 'text-red-400'
                                                        : log.type === 'success'
                                                            ? 'text-green-400'
                                                            : log.type === 'warning'
                                                                ? 'text-yellow-400'
                                                                : 'text-blue-400'
                                                }
                                            >
                                                {log.type.toUpperCase()}:
                                            </span>{' '}
                                            <span>{log.message}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t p-3 bg-gray-50">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">Current user:</span> {currentUser ? currentUser.email : 'Not logged in'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirebaseTestPanel;