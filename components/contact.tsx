"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Mail, MapPin, Github, Linkedin, Youtube, Sparkles } from "lucide-react"
import { IconWrapper } from "./ui/icon-wrapper"

interface ContactProps {
  darkMode: boolean
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
    const { name, email, message } = formData
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:bimbokmkj@gmail.com?subject=${subject}&body=${body}`
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="contact" className="py-20 md:py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
           <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-semibold mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open for Collaboration</span>
          </motion.div>

          <h2
            className={`text-5xl md:text-7xl font-black leading-[1.12] pb-2 mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 via-purple-400 to-blue-400" : "from-pink-600 via-purple-600 to-blue-600"
            } bg-clip-text text-transparent`}
          >
            Let's Build Together
          </h2>

          <div
            className={`w-32 h-1.5 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full`}
          />

          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto font-light leading-relaxed`}>
            Have a project in mind or just want to say hello? Drop me a message and let's start something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-10">
          {/* Contact Form */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.div
              variants={itemVariants}
              className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] backdrop-blur-2xl border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-2xl"
              } relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div variants={itemVariants}>
                    <label className={`block text-xs font-black tracking-[0.2em] uppercase mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 md:px-6 py-3.5 md:py-4 rounded-2xl border transition-all duration-500 font-medium ${
                        darkMode
                          ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-pink-500/50"
                          : "bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400 focus:border-pink-500/30 shadow-inner"
                      } focus:outline-none focus:ring-4 focus:ring-pink-500/10`}
                      placeholder="e.g. Bratik Mukherjee"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={`block text-xs font-black tracking-[0.2em] uppercase mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 md:px-6 py-3.5 md:py-4 rounded-2xl border transition-all duration-500 font-medium ${
                        darkMode
                          ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-pink-500/50"
                          : "bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400 focus:border-pink-500/30 shadow-inner"
                      } focus:outline-none focus:ring-4 focus:ring-pink-500/10`}
                      placeholder="name@company.com"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className={`block text-xs font-black tracking-[0.2em] uppercase mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    How can I help?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-4 md:px-6 py-3.5 md:py-4 rounded-2xl border transition-all duration-500 font-medium resize-none ${
                      darkMode
                        ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-pink-500/50"
                        : "bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400 focus:border-pink-500/30 shadow-inner"
                    } focus:outline-none focus:ring-4 focus:ring-pink-500/10`}
                    placeholder="Tell me about your vision..."
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-6 md:px-8 py-4.5 md:py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black tracking-widest uppercase rounded-2xl shadow-xl hover:shadow-pink-500/20 transition-all duration-500 flex items-center justify-center gap-3 text-sm md:text-base"
                >
                  <span className="relative z-10">Launch Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className={`p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-black/5 shadow-xl"
              } flex items-center gap-6 group`}
            >
              <IconWrapper icon={Mail} gradient="from-pink-500 to-purple-500" darkMode={darkMode} />
              <div>
                <h4 className={`text-xs font-black tracking-[0.2em] uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Email</h4>
                <p className={`text-base md:text-lg font-bold leading-tight break-all ${darkMode ? "text-white" : "text-gray-800"}`}>bimbokmkj@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-black/5 shadow-xl"
              } flex items-center gap-6 group`}
            >
              <IconWrapper icon={MapPin} gradient="from-blue-500 to-cyan-500" darkMode={darkMode} />
              <div>
                <h4 className={`text-xs font-black tracking-[0.2em] uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Location</h4>
                <p className={`text-base md:text-lg font-bold leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>Kolkata, WB, India</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-xl"
              }`}
            >
              <h4 className={`text-xs font-black tracking-[0.2em] uppercase mb-8 text-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Social Matrix</h4>
              <div className="flex justify-center gap-6">
                {[
                  { icon: Github, href: "https://github.com/Bimbok", gradient: "from-gray-600 to-gray-900" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/bratik-mukherjee-1067462a6/", gradient: "from-blue-600 to-indigo-700" },
                  { icon: Youtube, href: "https://youtube.com/@hellohellothisibimbok", gradient: "from-red-500 to-rose-700" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group"
                  >
                    <IconWrapper 
                      icon={social.icon} 
                      gradient={`bg-gradient-to-r ${social.gradient}`} 
                      darkMode={darkMode} 
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
