"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import Swal from "sweetalert2"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
  }

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
  }

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
  }

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
  }

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
            Uday Nandaniya
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {["home", "projects", "experience", "skills", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 relative ${
                  activeSection === item ? "text-purple-600 dark:text-purple-400" : ""
                }`}
              >
                {item}
                {activeSection === item && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/udaynandaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/uday-nandaniya-b990b9287"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 hover:scale-110 transition-transform"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "✕" : "☰"}
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
            <div className="pt-16">
              <motion.div
                className="flex flex-col space-y-4 px-4 py-6"
                variants={mobileMenuItemsListVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["home", "projects", "experience", "skills", "about", "contact"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollToSection(item)
                      setIsOpen(false)
                    }}
                    className={`capitalize text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 ${
                      activeSection === item ? "text-purple-600 dark:text-purple-400" : ""
                    }`}
                    variants={mobileMenuItemVariants}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <a
                    href="https://github.com/udaynandaniya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/uday-nandaniya-b990b9287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Welcome
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Uday Nandaniya
                </span>
              </motion.h1>

              <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium"
              >
                Full-Stack Developer & Problem Solver
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Passionate about creating innovative web solutions with modern technologies. Hands-on experience
                building real-world projects, focusing on performance, scalability, and user-friendly design.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Let's Connect
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1N7wwZ5d52-xxqslT8c9BVDp3voqrAeio/view?usp=sharing",
                      "_blank",
                    )
                  }
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
                  <MapPin size={16} />
                  <span>Ahmedabad, Gujarat</span>
                </div>
                <a
                  href="tel:+919898336415"
                  className="flex items-center space-x-2 hover:text-purple-600 transition-colors cursor-pointer"
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
                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    // src="/placeholder.svg?height=300&width=300"
                    src="./profile.jpg"

                    alt="Uday Nandaniya"
                    width={300}
                    height={300}
                    className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Explore my latest work showcasing full-stack development, modern UI/UX, and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Rural Reach Healthcare Platform */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-green-400 via-blue-500 to-teal-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://rural-reach-one.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">🏥</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">Rural Reach</div>
                  <div className="text-sm opacity-90">Healthcare Platform</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Rural Reach Healthcare Platform
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A comprehensive healthcare platform connecting rural communities with medical services, featuring
                  emergency alerts, health tips, and hospital management.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Next.js", "TypeScript", "MongoDB", "JWT", "Tailwind CSS"].map((tech) => (
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

            {/* Baby Shop E-commerce */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://mahadev-baby-shop.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">👶</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">Baby Shop</div>
                  <div className="text-sm opacity-90">E-commerce Platform</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Baby Shop</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Premium baby products e-commerce platform featuring comprehensive product catalog, secure shopping
                  cart, user authentication, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js", "TypeScript", "MongoDB", "JWT", "Cloudinary", "Tailwind CSS"].map((tech) => (
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
                    href="https://mahadev-baby-shop.vercel.app/"
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
            </motion.div>

            {/* NavneetHub */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://navneethub.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">📚</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">NavneetHub</div>
                  <div className="text-sm opacity-90">Book Trading Platform</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">NavneetHub</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A specialized platform connecting students for buying & selling used Navneet books with mobile
                  verification, session management, and automated cleanup.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js", "TypeScript", "MongoDB", "Zod", "Tailwind CSS"].map((tech) => (
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
                    href="https://navneethub.vercel.app/"
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

            {/* Food Zone */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://food-xi-indol.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">🍕</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">Food Zone</div>
                  <div className="text-sm opacity-90">Food Ordering Platform</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Food Zone</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A responsive online food ordering platform with intuitive menu browsing, cart management, and seamless
                  order confirmation process.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["HTML", "CSS", "JavaScript", "Responsive Design"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
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

            {/* Product Selling Website */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://product-selling-app.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">🛍️</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">Product Store</div>
                  <div className="text-sm opacity-90">E-commerce Platform</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Product Selling Website
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A modern e-commerce platform with interactive product showcase, responsive design, and optimized user
                  experience for online shopping.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["HTML", "CSS", "JavaScript", "Responsive Design"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
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

            {/* University Data Portal */}
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                className="h-48 bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
                onClick={() => window.open("https://university-data-portal.vercel.app/", "_blank")}
              >
                <div className="text-white text-center z-10">
                  <div className="text-4xl sm:text-5xl mb-3">🎓</div>
                  <div className="text-lg sm:text-xl font-bold mb-1">University Portal</div>
                  <div className="text-sm opacity-90">Data Management System</div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  University Data Portal
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  A comprehensive role-based dashboard system for university data management across Admin, Faculty,
                  Students, and Alumni with secure authentication.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"].map((tech) => (
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
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Experience & Achievements
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
              My professional journey and accomplishments
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Hackathon Achievement */}
              <motion.div
                className="relative pl-6 sm:pl-8 pb-8 border-l-4 border-purple-600"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏆</span>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Hack Orbit Finalist
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    MITS Gwalior • National-Level Hackathon
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">July 2025</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">
                    Selected as a finalist in a prestigious national-level hackathon, showcasing innovative
                    problem-solving skills and technical expertise in competitive programming.
                  </p>
                  <a
                    href="https://drive.google.com/file/d/1-MwH2qt07rILPgWnzpMpzRIWXMsUI27y/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium text-sm"
                  >
                    <ExternalLink size={14} />
                    View Certificate
                  </a>
                </div>
              </motion.div>

              {/* ShadowFox Internship */}
              <motion.div
                className="relative pl-6 sm:pl-8 pb-8 border-l-4 border-blue-600"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💼</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Web Development Intern
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">ShadowFox</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    One-month Virtual Internship • July 1st - July 31st, 2025
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Coordinator: Mr. Aakash Sir</p>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-3 text-sm sm:text-base">
                    <li>• Built a fully responsive personal portfolio using React and Tailwind CSS</li>
                    <li>
                      • Developed a comprehensive e-commerce platform "Baby Shop" using Next.js 15, TypeScript,
                      and MongoDB
                    </li>
                    <li>• Implemented secure JWT-based authentication with email OTP verification</li>
                    <li>• Integrated Cloudinary for media management and Stripe for payment processing</li>
                    <li>• Created admin dashboard with product management, order tracking, and analytics</li>
                    <li>• Earned Certificate of Completion for exceptional performance</li>
                  </ul>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a
                      href="https://drive.google.com/drive/folders/1wVxm1g1ATfEytpJPLL-46C83bSU_HBTP?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                      <ExternalLink size={14} />
                      View Certificate & Details
                    </a>
                    <a
                      href="https://mahadev-baby-shop.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                      <ExternalLink size={14} />
                      Live Project
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Skillcraft Technology Internship */}
              <motion.div
                className="relative pl-6 sm:pl-8 pb-8 border-l-4 border-green-600"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💻</span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Web Development Intern
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-2">Skillcraft Technology</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    One-month Virtual Internship • June 1st - June 30th, 2025
                  </p>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-3 text-sm sm:text-base">
                    <li>• Completed hands-on virtual internship focused on modern web development technologies</li>
                    <li>• Built responsive applications using Next.js, TypeScript, and Tailwind CSS</li>
                    <li>• Gained practical experience in full-stack development and API integration</li>
                    <li>• Earned Certificate of Completion and Letter of Recommendation for outstanding performance</li>
                  </ul>
                  <a
                    href="https://drive.google.com/drive/folders/1xQ8mabOZCPr73XEbkDTAFVo5Npcu-lBm?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-medium text-sm"
                  >
                    <ExternalLink size={14} />
                    View Certificate & Details
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Technical Expertise
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
                <Cpu className="text-purple-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Languages</h3>
              </div>
              <div className="space-y-3">
                {["C", "C++", "JavaScript", "TypeScript"].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm sm:text-base">
                      {skill}
                    </span>
                  </div>
                ))}
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
                <Code className="text-blue-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Frontend</h3>
              </div>
              <div className="space-y-3">
                {["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS"].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                      {skill}
                    </span>
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
                <Database className="text-green-600 mr-3" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Backend</h3>
              </div>
              <div className="space-y-3">
                {["Node.js", "Express.js", "MongoDB", "JWT"].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-sm sm:text-base">
                      {skill}
                    </span>
                  </div>
                ))}
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
                <span className="text-orange-600 mr-3 text-2xl">🛠️</span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Tools & Core</h3>
              </div>
              <div className="space-y-3">
                {["GitHub", "VS Code", "Cloudinary", "DBMS", "OOP", "Zod"].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm sm:text-base">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              I'm a passionate Full-Stack Developer currently pursuing B.Tech in Information and Communication
              Technology at Adani University. I specialize in creating innovative web solutions that solve real-world
              problems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="mr-3">🎓</span>
                Education
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-purple-600 pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                    Bachelor of Technology
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base">
                    Information and Communication Technology
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Adani University • 2022-2026</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CGPA: 7.7</p>
                </div>
                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Higher Secondary Certificate
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Alpha Vidya Sankul • 67%</p>
                </div>
                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Secondary School Certificate
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">S.D.B High School • 76%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="mr-3">🌟</span>
                Highlights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-purple-600 dark:text-purple-400 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🏆</span>
                    National Hackathon Finalist
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Recognized for innovative problem-solving at MITS Gwalior
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center text-sm sm:text-base">
                    <span className="mr-2">💼</span>
                    Professional Experience
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Completed internship with certificate and recommendation
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-green-600 dark:text-green-400 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🚀</span>
                    Full-Stack Projects
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Built 6+ production-ready applications with modern tech stack
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors break-words text-sm sm:text-base">
                      udaynandaniya5@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:UDAYNANDANIYA.ict22@adaniuni.ac.in"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Alternate Email</p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors break-words text-sm sm:text-base">
                      UDAYNANDANIYA.ict22@adaniuni.ac.in
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919898336415"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
                    <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                      +91 9898336415
                    </p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full flex-shrink-0">
                    <MapPin className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Location</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://github.com/udaynandaniya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/uday-nandaniya-b990b9287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-800 rounded-full hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Thank you for visiting my portfolio!</p>
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })

    try {
      const res = await fetch("https://formspree.io/f/xjkrkkqr", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Thanks!",
          text: "I'll reach out to you soon.",
          confirmButtonText: "OK",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission failed",
          text: "Please try again.",
          confirmButtonText: "OK",
        })
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Network error",
        text: "Please try later.",
        confirmButtonText: "OK",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="w-full bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center lg:text-left">
        Send a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-sm sm:text-base"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-sm sm:text-base"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-sm sm:text-base"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white resize-none text-sm sm:text-base"
            placeholder="Tell me about your project or just say hello!"
          ></textarea>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
        >
          {isSubmitting ? "Sending..." : "Send Message 🚀"}
        </Button>
      </form>
    </motion.div>
  )
}
