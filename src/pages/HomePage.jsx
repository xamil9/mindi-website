import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilmmakerRegistrationModal from "../components/FilmmakerRegistrationModal"; // Add this import
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function HomePage() {
  // Carousel state for cycling words
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const carouselWords = ["Content", "Audience", "Revenue"];

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

  // Add filmmaker registration modal state
  const [showFilmmakerModal, setShowFilmmakerModal] = useState(false);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll();
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Carousel effect for cycling words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) =>
        prevIndex === carouselWords.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [carouselWords.length]);

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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Enhanced word carousel animation
  const wordVariants = {
    initial: { opacity: 0, y: 20, rotateX: -90 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      rotateX: 90,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Component for animated sections
  const AnimatedSection = ({ children, variants = fadeInUp, className = "", delay = 0 }) => {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6, margin: "-5%" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar onJoinWaitlist={() => setShowWaitlistModal(true)} />

      {/* Hero Section - Update the hero section to include filmmaker CTA */}
      <motion.section
        id="hero"
        className="pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-7 gap-16 items-center">
            <motion.div
              className="md:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
                  variants={itemVariants}
                >
                  <motion.span
                    className="text-orange-500"
                    variants={itemVariants}
                  >
                    Your{" "}
                  </motion.span>
                  <motion.span
                    key={currentWordIndex}
                    className="inline-block text-blue-600"
                    variants={wordVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {carouselWords[currentWordIndex]}
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl mb-10 text-gray-600 max-w-lg"
                  variants={itemVariants}
                >
                  The infrastructure of choice for creators who want to self-distribute, monetize and own their audience. No algorithms burying your content, no competition for visibility.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  variants={itemVariants}
                >
                  <motion.button
                    className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-orange-500 transition duration-300 text-center text-lg font-medium"
                    onClick={() => setShowWaitlistModal(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Join Waitlist
                  </motion.button>

                  {/* Add Filmmaker CTA */}
                  <motion.button
                    className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-md hover:bg-blue-600 hover:text-white transition duration-300 text-center text-lg font-medium"
                    onClick={() => setShowFilmmakerModal(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    I'm a Filmmaker
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative md:col-span-5"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-100 to-orange-50 rounded-3xl p-2"
                  variants={scaleIn}
                >
                  <video
                    src="/hero-video.mp4"
                    alt="Media distribution platform"
                    className="rounded-2xl shadow-2xl w-full h-auto object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-orange-500 text-white p-6 rounded-xl shadow-lg"
                  variants={slideInFromBottom}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="font-bold text-lg">Own Your Distribution</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Add a dedicated Filmmaker Section before Features */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeInLeft}>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                For Filmmakers & Content Creators
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Take control of your distribution. Upload your films, set your pricing,
                track analytics, and build direct relationships with your audience.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Keep 85% of your revenue",
                  "Real-time analytics dashboard",
                  "Global distribution network",
                  "Direct audience communication",
                  "Flexible pricing models"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    variants={itemVariants}
                  >
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition duration-300 font-medium"
                onClick={() => setShowFilmmakerModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start as a Filmmaker
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img
                  src="/filmmaker-dashboard.jpg"
                  alt="Filmmaker Dashboard"
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6, margin: "-10%" }}
          >
            <motion.h2
              className="text-3xl font-bold text-blue-600 mb-4"
              variants={staggerItem}
            >
              Best Direct-to-Audience Solution
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              A fully branded platform with 4K streaming, adaptive language support, geoblocking,
              hybrid distribution, DRM protection, TV casting, audience CRM, global split payments, and more.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4, margin: "-5%" }}
          >
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                ),
                title: "Own Your Distribution",
                description: "Each piece of content gets its own space, its own audience, and its own ecosystem. No algorithms burying it, no competition for visibility."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Turn Viewers into Revenue Partners",
                description: "Every viewer gets a unique link — when someone engages through it, they earn. It's word-of-mouth, reimagined and finally rewarded."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                ),
                title: "Build Your Advocate Network",
                description: "Your fans become your collaborators. As they promote your content and drive engagement, they share in the success."
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={staggerItem}>
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {feature.icon}
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold text-xl text-orange-500 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6, margin: "-10%" }}
          >
            <motion.h2
              className="text-3xl font-bold text-blue-600 mb-4"
              variants={staggerItem}
            >
              Turn Your Audience Into Your Distribution Team
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Let curators, influencers, bloggers, and viewers advocate, promote, and catalogue your media.
              Increase reach and earnings for all.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5, margin: "-10%" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft}>
              <motion.h3
                className="text-2xl font-bold text-orange-500 mb-4"
                variants={staggerItem}
              >
                Turn Viewers Into Revenue Ambassadors
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-6"
                variants={staggerItem}
              >
                With Mindi, your audience becomes part of your distribution team. Every viewer gets a
                unique link — and when someone streams or buys your content through it, they earn.
                It's word-of-mouth, reimagined — and finally, rewarded. No more relying on platforms that bury your content.
              </motion.p>
              <motion.button
                className="text-blue-600 font-medium flex items-center gap-2 hover:text-orange-500 transition"
                variants={staggerItem}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Learn more
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.button>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <motion.div
                className="bg-gradient-to-br from-blue-100 to-orange-50 p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img src="/advocates.jpg" alt="Viewers as advocates" className="rounded-lg shadow-md w-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5, margin: "-10%" }}
            variants={staggerContainer}
          >
            <motion.div
              className="order-2 md:order-1"
              variants={fadeInLeft}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-100 to-orange-50 p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img src="/community.jpg" alt="Building community" className="rounded-lg shadow-md w-full" />
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              variants={fadeInRight}
            >
              <motion.h3
                className="text-2xl font-bold text-orange-500 mb-4"
                variants={staggerItem}
              >
                No More Algorithm Battles
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-6"
                variants={staggerItem}
              >
                Mindi isn't a list of content fighting for attention—it's a platform where every piece of content
                stands on its own. Each gets its own space, its own audience, and its own ecosystem. No algorithms
                burying it, no competition for visibility. Your fans can now become your collaborators.
              </motion.p>
              <motion.button
                className="text-blue-600 font-medium flex items-center gap-2 hover:text-orange-500 transition"
                variants={staggerItem}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Learn more
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6, margin: "-10%" }}
          >
            <motion.h2
              className="text-3xl font-bold text-blue-600 mb-4"
              variants={staggerItem}
            >
              What They Say
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Hear from creators and industry experts who are using our platform.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4, margin: "-5%" }}
          >
            {[
              {
                name: "Craig Leeson",
                role: "Multi-Award winning Filmmaker, Australian of the Year (Tas)",
                quote: "What Mindi's team is bringing to media is revolutionary! It's not just about distribution—it's about reclaiming creative freedom. Independent creators no longer have to seek permission to share their stories; they now have the power to do it on their own terms."
              },
              {
                name: "Mike Butcher",
                role: "Editor-At-Large, TechCrunch",
                quote: "Mindi gives creators analytics on viewership, such as which demographics the content is performing well with, minutes watched, and a database of users who have engaged with the content."
              },
              {
                name: "Kip Andersen",
                role: "Multi-Award winning Producer, Cowspiracy",
                quote: "The media industry has been desperately overdue for disruption, and Mindi is finally delivering it. When creators own their data and profits instead of serving streaming giants, the power shifts. Mindi just changed the game!"
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={staggerItem}>
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-md"
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="flex items-center mb-4"
                    variants={staggerItem}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-100 rounded-full mr-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </motion.div>
                  <motion.p
                    className="text-gray-600 italic"
                    variants={staggerItem}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5, margin: "-10%" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft}>
              <motion.h2
                className="text-3xl font-bold text-blue-600 mb-4"
                variants={staggerItem}
              >
                Get in Touch
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 mb-8"
                variants={staggerItem}
              >
                Ready to take control of your content distribution? Join our waitlist or contact us for more information.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 mb-8"
                variants={staggerItem}
              >
                {[
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    ),
                    text: "info@mindi.com"
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    ),
                    text: "+1 (123) 456-7890"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {contact.icon}
                      </svg>
                    </motion.div>
                    <span className="text-gray-600">{contact.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex gap-4"
                variants={staggerItem}
              >
                {[0, 1, 2, 3].map((index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {[
                    { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { id: "message", label: "Message", type: "textarea", placeholder: "How can we help you?" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <motion.textarea
                          id={field.id}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      ) : (
                        <motion.input
                          type={field.type}
                          id={field.id}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-300"
                    disabled={formStatus === "submitting"}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </motion.button>

                  {formStatus === "success" && (
                    <motion.p
                      className="text-green-600 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      Your message has been sent successfully!
                    </motion.p>
                  )}
                  {formStatus === "error" && (
                    <motion.p
                      className="text-red-600 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      There was an error sending your message. Please try again.
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Update to include filmmaker option */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6, margin: "-10%" }}
          >
            <motion.h2
              className="text-3xl font-bold mb-6"
              variants={staggerItem}
            >
              Own Your Content's Future
            </motion.h2>
            <motion.p
              className="text-lg mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Join thousands of creators who are taking control of their distribution, building direct audience relationships, and turning viewers into advocates.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <motion.button
                className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 font-medium"
                onClick={() => setShowWaitlistModal(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Join Waitlist
              </motion.button>

              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition duration-300 font-medium"
                onClick={() => setShowFilmmakerModal(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Register as Filmmaker
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4, margin: "-5%" }}
          >
            <motion.div variants={staggerItem}>
              <motion.div
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img src="/logo.png" alt="Mindi Logo" className="h-8" />
                <span className="text-xl font-bold text-blue-600">Mindi</span>
              </motion.div>
              <motion.p
                className="text-gray-600 mb-6"
                variants={staggerItem}
              >
                Pioneering the future of media distribution with next-generation tools.
              </motion.p>
              <motion.div
                className="flex gap-4"
                variants={staggerItem}
              >
                {[0, 1, 2, 3].map((index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Blog"]
              },
              {
                title: "Product",
                links: ["Features", "Pricing", "Case Studies", "Documentation"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
              }
            ].map((section, index) => (
              <motion.div key={section.title} variants={staggerItem}>
                <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                <motion.ul
                  className="space-y-2"
                  variants={staggerContainer}
                >
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link}
                      variants={staggerItem}
                    >
                      <motion.a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-gray-200 mt-12 pt-8 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            <p className="text-gray-600">
              © {new Date().getFullYear()} Mindi. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Join Our Waitlist</h3>
              <motion.button
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-500 hover:text-gray-700"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <p className="text-gray-600 mb-6">Be the first to know when we launch and get early access!</p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <motion.input
                  type="email"
                  id="waitlist-email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-300"
                disabled={waitlistStatus === "submitting"}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {waitlistStatus === "submitting" ? "Submitting..." : "Join Waitlist"}
              </motion.button>

              {waitlistStatus === "success" && (
                <motion.p
                  className="text-green-600 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Thanks for joining our waitlist! We'll be in touch soon.
                </motion.p>
              )}
              {waitlistStatus === "error" && (
                <motion.p
                  className="text-red-600 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  There was an error. Please try again later.
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Filmmaker Registration Modal - Add this */}
      <FilmmakerRegistrationModal
        isOpen={showFilmmakerModal}
        onClose={() => setShowFilmmakerModal(false)}
      />
    </div>
  );
}