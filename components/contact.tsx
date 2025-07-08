"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Mail, MapPin, Github, Linkedin, Twitter, Youtube } from "lucide-react"

interface ContactProps {
  darkMode: boolean
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const { name, email, message } = formData

  const subject = encodeURIComponent(`Message from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

  const mailtoLink = `mailto:bimbok@example.com?subject=${subject}&body=${body}`

  window.location.href = mailtoLink
}

export default function Contact({ darkMode }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Floating elements animation
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-2 h-2 rounded-full ${darkMode ? "bg-pink-400/30" : "bg-pink-500/30"}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, Math.random() * 20 - 10, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
        ease: "easeInOut",
      }}
    />
  ))

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Floating background elements */}
      {floatingElements}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Let's Connect
          </h2>

          <div
            className={`w-24 h-1 mx-auto mb-8 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } rounded-full`}
          />

          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
            I'm always open to collaborating on exciting projects and growing as a developer. Let's build something
            amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-3xl backdrop-blur-sm border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
              } shadow-xl`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Send me a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                        : "bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-pink-500"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                        : "bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-pink-500"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                      darkMode
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                        : "bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-pink-500"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    placeholder="Tell me about your project or just say hi!"
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
              } shadow-xl hover:shadow-2xl transition-all duration-300 group`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center`}
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>Email</h4>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>bimbok@example.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
              } shadow-xl hover:shadow-2xl transition-all duration-300 group`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center`}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>Location</h4>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Kolkata, West Bengal, India</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
              } shadow-xl`}
            >
              <h4 className={`font-bold text-lg mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Bimbok", color: "from-gray-600 to-gray-800" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/bratik-mukherjee-1067462a6/", color: "from-blue-600 to-blue-800" },
                  { icon: Youtube, href: "https://youtube.com/@hellohellothisibimbok", color: "from-red-400 to-red-600" },
                ].map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
