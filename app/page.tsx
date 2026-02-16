

"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";

import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Database,
  Cpu,
  Share2,
  Wrench,
  Server,
  Trophy,
  Award,
  Code2,
  Briefcase,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

import ResumeModal from "@/components/ResumeModal";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [openResume, setOpenResume] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "projects",
        "internship",
        "skills",
        "certificates",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5,
      },
    },
  };

  const mobileMenuContainerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
      },
    },
  };

  const mobileMenuItemsListVariants = {
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    hidden: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleShare = async () => {
    const shareData = {
      title: "Uday Nandaniya - Full-Stack Developer Portfolio",
      text: "Check out my portfolio showcasing full-stack development projects and skills.",
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Portfolio link copied to clipboard!");
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Portfolio link copied to clipboard!");
      } catch (clipboardError) {
        console.error("Failed to share or copy link:", clipboardError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="font-bold text-lg sm:text-xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent whitespace-nowrap flex-shrink-0">
            Uday Nandaniya
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              "home",
              "projects",
              "internship",
              "skills",
              "certificates",
              "education",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 relative text-sm lg:text-base ${
                  activeSection === item
                    ? "text-orange-600 dark:text-orange-400"
                    : ""
                }`}
              >
                {item}
                {activeSection === item && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a
              href="https://github.com/udaynandaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 p-1"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/uday-nandaniya-"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 p-1"
            >
              <Linkedin size={18} />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 hover:scale-110 transition-transform"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 min-w-[40px] h-[40px] flex items-center justify-center"
              >
                <span className="text-lg font-medium">
                  {isOpen ? "✕" : "☰"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-xl z-40 overflow-y-auto"
            variants={mobileMenuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="pt-16 min-h-screen">
              <motion.div
                className="flex flex-col space-y-4 px-4 py-6"
                variants={mobileMenuItemsListVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {[
                  "home",
                  "projects",
                  "internship",
                  "skills",
                  "certificates",
                  "education",
                  "contact",
                ].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setIsOpen(false);
                    }}
                    className={`capitalize text-left hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-3 text-lg font-medium ${
                      activeSection === item
                        ? "text-orange-600 dark:text-orange-400"
                        : ""
                    }`}
                    variants={mobileMenuItemVariants}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <a
                    href="https://github.com/udaynandaniya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-2"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/uday-nandaniya-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-2"
                  >
                    <Linkedin size={24} />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 pb-16 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                  Welcome
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Uday Nandaniya
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Final-year B.Tech (ICT) student with hands-on experience in
                building scalable full-stack web applications. Strong in the
                JavaScript ecosystem, REST APIs, and authentication systems.
                Seeking Frontend, Backend, or Full-Stack Developer roles
                (Internship / Full-Time).
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Let's Connect
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setOpenResume(true)}
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center space-x-2 hover:text-orange-600 transition-colors">
                  <MapPin size={16} />
                  <span>Ahmedabad, Gujarat</span>
                </div>
                <a
                  href="tel:+919898336415"
                  className="flex items-center space-x-2 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <Phone size={16} />
                  <span>+91 9898336415</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="flex justify-center order-1 lg:order-2"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative group">
                {/* Orange Ring */}
                <div
                  className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 
                    rounded-full 
                    bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 
                    p-[6px] overflow-hidden"
                >
                  {/* Image Wrapper */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src="/me__.jpeg"
                      alt="Uday Nandaniya"
                      fill
                      priority
                      className="object-cover object-center 
                     transition-transform duration-300 
                     group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ResumeModal
  open={openResume}
  onClose={() => setOpenResume(false)}
/>


     

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-200  bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Hero */}
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open("https://rural-reach-one.vercel.app/", "_blank")
                }
              >
                <Image
                  src="/Project_Image/Health_Care.png"
                  alt="Rural Reach Healthcare Platform"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                {/* Overlay – subtle on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                {/* External link icon – always visible on mobile */}
                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Rural Reach Healthcare Platform
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A comprehensive healthcare platform connecting rural
                  communities with medical services, featuring emergency alerts,
                  health tips, and hospital management.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "MongoDB",
                    "JWT",
                    "Tailwind CSS",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://rural-reach-one.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/Rural_Reach_HealthCare_Platform-Readme.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open(
                    "https://university-data-portal.vercel.app/",
                    "_blank",
                  )
                }
              >
                <Image
                  src="/Project_Image/university_data_portal.png"
                  alt="University Data Portal"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  University Data Portal
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A comprehensive role-based dashboard system for university
                  data management across Admin, Faculty, Students, and Alumni
                  with secure authentication.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "JWT",
                    "Tailwind CSS",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://university-data-portal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/University_data_portal_readme.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Baby Shop E-commerce */}
            {/* <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open("https://babybloomapp.vercel.app/", "_blank")
                }
              >
                <Image
                  src="/Project_Image/Ecommerce.png"
                  alt=" Baby Shop E-commerce Platform"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        BabyBloom | Everything for Your Little One
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Premium baby products e-commerce platform featuring a
                  comprehensive product catalog, secure shopping cart, user
                  authentication, and a full admin dashboard.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Next.js",
                    "TypeScript",
                    "MongoDB",
                    "JWT",
                    "Cloudinary",
                    "Tailwind CSS",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://babybloomapp.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/baby_shop_readme.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div> */}

            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open("https://bookshareapp.vercel.app/", "_blank")
                }
              >
                <Image
                  src="/Project_Image/Book_selling.png"
                  alt="BookShareApp  Trading Platform"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  BookShareApp
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A specialized platform connecting students for buying and
                  selling used Navneet books with mobile verification, secure
                  session management, and automated cleanup.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Next.js",
                    "TypeScript",
                    "MongoDB",
                    "Zod",
                    "Tailwind CSS",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://bookshareapp.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/Navneethub_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open("https://food-xi-indol.vercel.app/", "_blank")
                }
              >
                <Image
                  src="/Project_Image/Foodie.png"
                  alt="Food Zone Food Ordering Platform"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Food Zone
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A responsive online food ordering platform with intuitive menu
                  browsing, cart management, and a seamless order confirmation
                  experience.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {["HTML", "CSS", "JavaScript", "Responsive Design"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://food-xi-indol.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/Food"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open(
                    "https://product-selling-app.vercel.app/",
                    "_blank",
                  )
                }
              >
                <Image
                  src="/Project_Image/Product_selling.png"
                  alt="Product Selling Website"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-3 right-3 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Product Selling Website
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A modern e-commerce platform with interactive product
                  showcase, responsive design, and an optimized user experience
                  for online shopping.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {["HTML", "CSS", "JavaScript", "Responsive Design"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://product-selling-app.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>

                  <a
                    href="https://github.com/udaynandaniya/Product_selling_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section
        id="internship"
        className="py-16 sm:py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Internship 
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div
                className="relative pl-6 sm:pl-8 pb-10 border-l-4 border-orange-500"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* <div className="absolute -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💼</span>
                </div> 

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 sm:p-6 rounded-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div
                      className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg cursor-pointer"
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/drive/folders/1wVxm1g1ATfEytpJPLL-46C83bSU_HBTP?usp=sharing",
                          "_blank",
                        )
                      }
                    >
                      <Image
                        src="/internship/ShadowFox.jpeg"
                        alt="ShadowFox Internship Certificate"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors duration-300" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Full-Stack Development Training
                      </h3>

                      <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">
                        ShadowFox
                      </p>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        1-Month Remote Training Program • Project-Based
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                        Worked on hands-on projects including a personal
                        portfolio and a full-stack e-commerce application using
                        modern web technologies.
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          Next.js
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          TypeScript
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          MongoDB
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          JWT Auth
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href="https://drive.google.com/drive/folders/1wVxm1g1ATfEytpJPLL-46C83bSU_HBTP?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
                        >
                          <ExternalLink size={16} />
                          View Certificate
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative pl-6 sm:pl-8 pb-10 border-l-4 border-orange-400"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💻</span>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 sm:p-6 rounded-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div
                      className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg cursor-pointer"
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/drive/folders/1xQ8mabOZCPr73XEbkDTAFVo5Npcu-lBm?usp=sharing",
                          "_blank",
                        )
                      }
                    >
                      <Image
                        src="/internship/Skillcraft.jpg"
                        alt="Skillcraft Internship Certificate"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors duration-300" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Web Development Intern
                      </h3>

                      <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">
                        Skillcraft Technology
                      </p>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        1-Month Remote Training Program • Project-Based
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                        Focused on responsive web design and frontend
                        development. Built interfaces using HTML, CSS,
                        JavaScript, and React, implemented responsive layouts,
                        integrated APIs, and gained foundational knowledge of
                        recommendation logic and modern web app architecture.
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          HTML
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          CSS
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          JavaScript
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          React
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          Responsive Design
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 rounded-full">
                          API Integration
                        </span>
                      </div>

                      <a
                        href="https://drive.google.com/drive/folders/1xQ8mabOZCPr73XEbkDTAFVo5Npcu-lBm?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
                      >
                        <ExternalLink size={14} />
                        View Certificate
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      {/* <section
        id="skills"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
              Technologies, tools, and core subjects I work with
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Cpu className="text-orange-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Languages
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["C", "C++", "JavaScript", "TypeScript", "Java", "SQL"].map(
                  (skill) => (
                    <div key={skill} className="group relative">
                      <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                          {skill}
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Code className="text-orange-500 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Frontend
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  "HTML",
                  "CSS",
                  "React.js",
                  "Next.js",
                  "Tailwind CSS",
                  "Responsive Design",
                ].map((skill) => (
                  <div key={skill} className="group relative">
                    <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                        {skill}
                      </span>
                    </div>

                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Database className="text-orange-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Backend
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["Node.js", "Express.js", "REST APIs", "JWT Auth"].map(
                  (skill) => (
                    <div key={skill} className="group relative">
                      <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                          {skill}
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Server className="text-orange-600 mr-3" size={24} />

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Database & Cloud
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["Node.js", "Express.js", "REST APIs", "JWT Auth"].map(
                  (skill) => (
                    <div key={skill} className="group relative">
                      <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                          {skill}
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Wrench className="text-orange-600 mr-3" size={24} />

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Tools & Core
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  "OOP",
                  "DBMS",
                  "DSA",
                  "Git",
                  "GitHub",
                  "Postman",
                  "VS Code",
                  "Copilot",
                  "Zod",
                  
                ].map((skill) => (
                  <div key={skill} className="group relative">
                    <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                        {skill}
                      </span>
                    </div>

                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      <section
        id="internship"
        className="py-16 sm:py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===== Section Heading ===== */}
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight">
              Internship Experience
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            {/* ================= SHADOWFOX ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-7 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-orange-200/40 dark:hover:shadow-orange-900/20 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Certificate Image */}
                <div
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/drive/folders/1wVxm1g1ATfEytpJPLL-46C83bSU_HBTP?usp=sharing",
                      "_blank",
                    )
                  }
                >
                  <Image
                    src="/internship/ShadowFox.jpeg"
                    alt="ShadowFox Internship Certificate"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div>
                  {/* Role Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 ring-1 ring-orange-300/60 dark:ring-orange-700/50">
                      <Briefcase className="text-orange-500" size={18} />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                        Full-Stack Development Training
                      </h3>

                      <a
                        href="https://www.linkedin.com/company/shadowfoxinfo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-md
  bg-orange-100 dark:bg-orange-900/40
  text-orange-700 dark:text-orange-300
  text-sm font-medium
  hover:bg-orange-200 dark:hover:bg-orange-800/50
  transition"
                      >
                        <Globe size={14} />
                        ShadowFox
                        <ExternalLink size={13} className="opacity-70" />
                      </a>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    1-Month Remote Training Program • Project-Based
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                    Worked on a personal portfolio and a full-stack e-commerce
                    application using modern web technologies and authentication
                    systems.
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["Next.js", "TypeScript", "MongoDB", "JWT Auth"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-orange-400 hover:text-orange-600 transition"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>

                  {/* Button */}
                  <a
                    href="https://drive.google.com/drive/folders/1wVxm1g1ATfEytpJPLL-46C83bSU_HBTP?usp=sharing"
                    target="_blank"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                  >
                    <ExternalLink size={16} />
                    View Certificate
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ================= SKILLCRAFT ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-7 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-orange-200/40 dark:hover:shadow-orange-900/20 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/drive/folders/1xQ8mabOZCPr73XEbkDTAFVo5Npcu-lBm?usp=sharing",
                      "_blank",
                    )
                  }
                >
                  <Image
                    src="/internship/Skillcraft.jpg"
                    alt="Skillcraft Internship Certificate"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 ring-1 ring-orange-300/60 dark:ring-orange-700/50">
                      <Briefcase className="text-orange-500" size={18} />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                        Web Development Intern
                      </h3>
                      <a
                        href="https://www.linkedin.com/company/skillcraft-technology/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-md
  bg-orange-100 dark:bg-orange-900/40
  text-orange-700 dark:text-orange-300
  text-sm font-medium
  hover:bg-orange-200 dark:hover:bg-orange-800/50
  transition"
                      >
                        <Globe size={14} />
                        Skillcraft Technology
                        <ExternalLink size={13} className="opacity-70" />
                      </a>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    1-Month Remote Training Program • Project-Based
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
                    Built responsive interfaces using HTML, CSS, JavaScript and
                    React, implemented layouts, integrated APIs, and understood
                    modern web architecture.
                  </p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    {[
                      "HTML",
                      "CSS",
                      "JavaScript",
                      "React",
                      "Responsive Design",
                      "API Integration",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-orange-400 hover:text-orange-600 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://drive.google.com/drive/folders/1xQ8mabOZCPr73XEbkDTAFVo5Npcu-lBm?usp=sharing"
                    target="_blank"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                  >
                    <ExternalLink size={16} />
                    View Certificate
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
              Technologies, tools, and core subjects I work with
            </p>
          </div>

          <div className="space-y-10">
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Cpu className="text-orange-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Languages
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["C", "C++", "JavaScript", "TypeScript", "Java", "SQL"].map(
                  (skill) => (
                    <div key={skill} className="group relative">
                      <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                          {skill}
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Code className="text-orange-500 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Frontend
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  "HTML",
                  "CSS",
                  "React.js",
                  "Next.js",
                  "Tailwind CSS",
                  "Responsive Design",
                ].map((skill) => (
                  <div key={skill} className="group relative">
                    <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                        {skill}
                      </span>
                    </div>

                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Database className="text-orange-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Backend
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["Node.js", "Express.js", "REST APIs", "JWT Auth"].map(
                  (skill) => (
                    <div key={skill} className="group relative">
                      <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                          {skill}
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

         

            <motion.div
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Wrench className="text-orange-600 mr-3" size={24} />

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Tools & Core
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  "OOP",
                  "DBMS",
                  "DSA",
                  "Git",
                  "GitHub",
                  "Postman",
                  "VS Code",
                  "Copilot",
                  "Zod",
                ].map((skill) => (
                  <div key={skill} className="group relative">
                    <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-800/60 border-[2.5px] border-orange-400 dark:border-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500 transition-all duration-300 backdrop-blur-md cursor-default hover:scale-[1.05]">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base font-semibold tracking-wide">
                        {skill}
                      </span>
                    </div>

                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-lg -z-10"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="certificates"
        className="py-16 sm:py-20 bg-white dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Achievements & Certificates
            </h2>
          </div>

          {/* ================= ACHIEVEMENTS ================= */}
          {/* <h3 className="text-xl sm:text-2xl font-bold mb-8 text-orange-500 dark:text-orange-400">
  Achievements :
</h3> */}

          <SectionTitle icon={Trophy} title="Achievements" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "Policython X QCI 2025",
                img: "/certificates/Policython.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQDtd9GuX5-CRbdEoPTsBpqJAQ3ihncC_SBueoGKaI7D0Rw",
                tag: "Top 10 Team • 200+ Teams",
                desc: "Selected among the Top 10 teams nationwide for Policython X QCI 2025, showcasing policy research, innovation, and teamwork.",
                color: "text-indigo-600",
              },
              {
                title: "Hack Orbit – Finalist",
                img: "/Hackathone/hackorbit_final.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQBhxyjA1FqeS4PbnO61PxWNAbyNh7O79rAIIDTME0tMuVc",
                tag: "Finalist • 400+ Teams",
                desc: "Finalist at Hack Orbit among 400+ teams, developing innovative tech solutions under competitive hackathon constraints.",
                color: "text-orange-600",
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border overflow-hidden"
              >
                <div className="relative h-40">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="text-orange-600 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className={`text-sm font-semibold ${item.color} mb-2`}>
                    {item.tag}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ================= CERTIFICATIONS ================= */}
          {/* <h3 className="text-xl sm:text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Certifications :
          </h3> */}

          <SectionTitle icon={Award} title="Certifications" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "React.js",
                provider: "Simplilearn Skillup",
                img: "/certificates/Reactjs.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQDq74ygim3dSKfT_bvcwyD-AZCFXcOqQTmmZOwn5jEo-Uk",
                desc: "Professional certification in React.js covering modern component patterns, hooks, and best practices.",
              },
              {
                title: "MERN Stack",
                provider: "Simplilearn Skillup",
                img: "/certificates/Mern_Stack.jpg",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQAIK7_jFoTxQZG44Nz-MWTmATFy8U7Z1RC67cT7mFsuD3A",
                desc: "Complete MERN stack training including MongoDB, Express, React, and Node.js for full-stack development.",
              },
              {
                title: "Node.js",
                provider: "Simplilearn Skillup",
                img: "/certificates/Nodejs.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQC29g5lxOS9R4PXNAgc2OylAW4BsH1QkKgPXFMdVHE4zKU",
                desc: "Backend development certification focused on Node.js runtime, Express framework, and REST APIs.",
              },
              {
                title: "Prompt Engineering",
                provider: "IBM Skills Network",
                img: "/certificates/Prompt_Engineer_Certificate.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQD5SpbZz_7VT7epInQSxM-bAXB-gn4Ow2v4rwz-m4AEgGw",
                desc: "Training in prompt engineering techniques for AI and LLM-based applications.",
              },
              {
                title: "Online Coding Challenge",
                provider: "Coding Competition",
                img: "/Hackathone/Dsa_coding.jpg",
                link: "https://aii01-my.sharepoint.com/my?viewid=37ed23eb%2D3f28%2D483e%2D9f12%2Dd8d9cb30b84f&id=%2Fpersonal%2Fudaynandaniya%5Fict22%5Fadaniuni%5Fac%5Fin%2FDocuments%2FResume%2FDsa%5Fcoding%5Fcompetition%5FKnowy%2Ejpg&parent=%2Fpersonal%2Fudaynandaniya%5Fict22%5Fadaniuni%5Fac%5Fin%2FDocuments%2FResume",
                desc: "Successfully completed competitive coding challenges demonstrating algorithmic thinking and problem-solving skills.",
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border overflow-hidden"
              >
                <div className="relative h-40">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="text-orange-600 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="text-sm font-semibold text-orange-600 mb-2">
                    {item.provider}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ================= HACKATHONS ================= */}
          {/* <h3 className="text-xl sm:text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Hackathons :
          </h3> */}

          <SectionTitle icon={Code2} title="Hackathons" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                title: "Hackspire 2025",
                img: "/Hackathone/Hackspire_AdaniUniversity.png",
                link: "https://aii01-my.sharepoint.com/:b:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQCB5rpPQtfUR7YfguPfJ99bAad3QKI3QTNC1FYK88do83Y",
                tag: "Adani University",
              },
              {
                title: "Odoo x Adani University Hackathon 2026",
                img: "/Hackathone/oddo.jpeg",
                link: "https://aii01-my.sharepoint.com/:i:/g/personal/udaynandaniya_ict22_adaniuni_ac_in/IQDDlt7Mi5JRRpSSKH3uHHNrAcjhwUX9gOCKqmE0gAVNQh8",
                tag: "Finalist • Industry–Academic Hackathon",
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border overflow-hidden"
              >
                <div className="relative h-40">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="text-orange-600 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="text-sm font-semibold text-orange-600">
                    {item.tag}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="education"
        className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-gray-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Education
            </h2>
          </div>

          <motion.div
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="mr-3">🎓</span>
              Educational Background
            </h3>
            <div className="space-y-6">
              <div className=" border-orange-600 pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                  Bachelor of Technology
                </h4>
                <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm sm:text-base">
                  Information and Communication Technology
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Adani University • 2022-2026
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CGPA: 7.9/10
                </p>
              </div>
              <div className=" pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Higher Secondary Certificate
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Alpha Vidya Sankul • 74.67 PR
                </p>
              </div>
              <div className=" pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Secondary School Certificate
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  S.D.B High School • 94.73 PR
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}

      <section
        id="contact"
        className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                Get In Touch
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <a
                  href="mailto:udaynandaniya5@gmail.com"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail
                      className="text-orange-600 dark:text-orange-400"
                      size={20}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      Email
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors break-words text-sm sm:text-base">
                      udaynandaniya5@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:UDAYNANDANIYA.ict22@adaniuni.ac.in"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail
                      className="text-orange-600 dark:text-orange-400"
                      size={20}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      Alternate Email
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors break-words text-sm sm:text-base">
                      UDAYNANDANIYA.ict22@adaniuni.ac.in
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919898336415"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-200 to-orange-100 dark:from-orange-800/30 dark:to-orange-900/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Phone
                      className="text-orange-600 dark:text-orange-400"
                      size={20}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      Phone
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base">
                      +91 9898336415
                    </p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex-shrink-0">
                    <MapPin
                      className="text-orange-600 dark:text-orange-400"
                      size={20}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      Location
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://github.com/udaynandaniya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full hover:from-orange-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/uday-nandaniya-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-800 rounded-full hover:from-orange-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Linkedin size={24} />
                </a>
                <button
                  onClick={handleShare}
                  className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-800 rounded-full hover:from-orange-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                  title="Share Portfolio"
                >
                  <Share2 size={24} />
                </button>
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Thank you for visiting my portfolio!
          </p>
        </div>
      </footer>
    </div>
  );
}

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.5,
    },
  },
};

const mobileMenuContainerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "afterChildren",
    },
  },
};

const mobileMenuItemsListVariants = {
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const mobileMenuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ContactForm Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     const response = await fetch("https://api.web3forms.com/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         access_key: "4f2b4e46-4cf2-4fbf-8313-eb75b66fa2e1",
  //         name: formData.name,
  //         email: formData.email,
  //         message: formData.message,
  //       }),
  //     })

  //     if (response.ok) {
  //       Swal.fire({
  //         title: "Success!",
  //         text: "Your message has been sent successfully. I'll get back to you soon!",
  //         icon: "success",
  //         confirmButtonColor: "#ea580c",
  //       })
  //       setFormData({
  //         name: "",
  //         email: "",
  //         message: "",
  //       })
  //     } else {
  //       Swal.fire({
  //         title: "Error!",
  //         text: "There was an issue sending your message. Please try again.",
  //         icon: "error",
  //         confirmButtonColor: "#ea580c",
  //       })
  //     }
  //   } catch (error) {
  //     console.error("Form submission error:", error)
  //     Swal.fire({
  //       title: "Error!",
  //       text: "There was an issue sending your message. Please try again.",
  //       icon: "error",
  //       confirmButtonColor: "#ea580c",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "33400040-c76f-44b8-b5ed-5ffc375ec5c0",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      // console.log("Web3Forms:", data) // 👈 CHECK THIS

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#ea580c",
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Submission failed.",
          icon: "error",
          confirmButtonColor: "#ea580c",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "Network error. Please try again later.",
        icon: "error",
        confirmButtonColor: "#ea580c",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center">
        Send Me a Message
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-400 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-400 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Your message here..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-400 transition-all resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-full transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </motion.form>
  );
}
