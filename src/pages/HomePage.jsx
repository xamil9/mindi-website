import React, { useState } from "react";
import Navbar from "../components/Navbar";
// Add framer-motion import
import { motion } from 'framer-motion';

export default function HomePage() {
  // Form state for contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState(null);

  // Waitlist modal state
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState(null);

  // Form handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  // Waitlist handlers
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistStatus("submitting");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWaitlistStatus("success");
      setTimeout(() => {
        setShowWaitlistModal(false);
        setWaitlistStatus(null);
        setWaitlistEmail("");
      }, 2000);
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setWaitlistStatus("error");
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  <span className="text-blue-600">Pioneering</span> the Future of Media Distribution
                </h1>
              </motion.div>
              <p className="text-lg mb-8 text-gray-600 max-w-lg">
                Empower creators and distributors with next-generation tools to deliver, monetize, and engage with audiences directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-orange-500 transition duration-300 text-center"
                  onClick={() => setShowWaitlistModal(true)}
                >
                  Join Waitlist
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:border-orange-500 hover:text-orange-500 transition duration-300 text-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-orange-50 rounded-2xl p-4">
                <img
                  src="/hero-image.jpg"
                  alt="Media distribution platform"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                <p className="font-bold">Own Your Distribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Best Direct-to-Audience Solution</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A fully branded platform with powerful tools to distribute your content,
              engage your audience, and maximize your revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-orange-500 mb-3">Smart Distribution</h3>
              <p className="text-gray-600">
                Deliver your media content across multiple channels with intelligent routing and analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-orange-500 mb-3">Monetization</h3>
              <p className="text-gray-600">
                Multiple revenue streams with global payment processing and revenue sharing capabilities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-orange-500 mb-3">Audience Insights</h3>
              <p className="text-gray-600">
                Get real-time analytics on viewer engagement and behavior across all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Just Creative Control and Community Trust</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let curators, influencers, bloggers, and viewers advocate, promote, and catalogue your media.
              Increase reach and earnings for all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Turn Viewers Into Advocates</h3>
              <p className="text-gray-600 mb-6">
                With Mindi, your audience becomes part of your distribution team. Every viewer gets a
                unique link — and when someone streams or buys your content through it, they earn.
                It's word-of-mouth, reimagined — and finally, rewarded.
              </p>
              <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-orange-500 transition">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-orange-50 p-6 rounded-xl">
              <img src="/advocates.jpg" alt="Viewers as advocates" className="rounded-lg shadow-md w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-blue-100 to-orange-50 p-6 rounded-xl">
              <img src="/community.jpg" alt="Building community" className="rounded-lg shadow-md w-full" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Turn Your Audience Into a Community</h3>
              <p className="text-gray-600 mb-6">
                Your fans can now become your collaborators. As they promote your content and drive views,
                they share in the success. It's a powerful, grassroots approach to grow your audience and
                boost your revenue — all by turning fans into content partners.
              </p>
              <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-orange-500 transition">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">What They Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from creators and industry experts who are using our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">David Johnson</h4>
                  <p className="text-sm text-gray-500">Award-winning Filmmaker</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "What Mindi's team is bringing to media is revolutionary! It's not just about distribution—it's about
                reclaiming creative freedom. Creators no longer have to seek permission to share their stories."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Editor-At-Large, MediaTech</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Mindi also gives creators analytics on engagement, such as audience demographics and viewing patterns,
                as well as minutes watched and a database of users who have engaged with the content."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Multi-Award winning Producer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The media industry has been desperately overdue for disruption, and Mindi is finally delivering it. When
                creators own their data and profits instead of serving streaming giants, the power shifts."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to take control of your content distribution? Join our waitlist or contact us for more information.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">info@mindi.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">+1 (123) 456-7890</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Add the new Twitter link */}
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-300"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>

                {formStatus === "success" && (
                  <p className="text-green-600 text-center">Your message has been sent successfully!</p>
                )}
                {formStatus === "error" && (
                  <p className="text-red-600 text-center">There was an error sending your message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Own Your Media's Future?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are taking control of their distribution, audience, and revenue.
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 font-medium"
            onClick={() => setShowWaitlistModal(true)}
          >
            Join Waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="Mindi Logo" className="h-8" />
                <span className="text-xl font-bold text-blue-600">Mindi</span>
              </div>
              <p className="text-gray-600 mb-6">
                Pioneering the future of media distribution with next-generation tools.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Add the new gray Twitter link */}
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Case Studies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Mindi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Join Our Waitlist</h3>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6">Be the first to know when we launch and get early access!</p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="waitlist-email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-300"
                disabled={waitlistStatus === "submitting"}
              >
                {waitlistStatus === "submitting" ? "Submitting..." : "Join Waitlist"}
              </button>

              {waitlistStatus === "success" && (
                <p className="text-green-600 text-center">Thanks for joining our waitlist! We'll be in touch soon.</p>
              )}
              {waitlistStatus === "error" && (
                <p className="text-red-600 text-center">There was an error. Please try again later.</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}