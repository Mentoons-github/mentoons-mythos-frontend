import React, { useState } from "react";
import { Star, Moon, Send, Mail, User, MessageCircle } from "lucide-react";

const AstrologyContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link
    const subject = encodeURIComponent(formData.subject || "Astrology Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:mentoonsmythos@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star
              className="text-white opacity-30"
              size={Math.random() * 8 + 4}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Moon className="text-white mr-3 animate-spin-slow" size={48} />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <Moon className="text-white ml-3 animate-spin-slow" size={48} />
            </div>

            {/* Inspirational Quote */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px top-1/2"></div>
              <blockquote className="text-xl italic text-gray-300 mb-2 bg-black px-8">
                "The stars whisper secrets to those who dare to listen"
              </blockquote>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Star className="mr-3 text-white" />
                  Reach Out to the Universe
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-white" size={20} />
                    <div>
                      <p className="text-gray-300">Email us directly:</p>
                      <a
                        href="mailto:mentoonsmythos@gmail.com"
                        className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
                      >
                        mentoonsmythos@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-medium mb-3 text-white">
                    What We Offer
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <Star className="mr-2 mt-1 text-white" size={12} />
                      Birth chart interpretations
                    </li>
                    <li className="flex items-start">
                      <Star className="mr-2 mt-1 text-white" size={12} />
                      Cosmic guidance sessions
                    </li>
                    <li className="flex items-start">
                      <Star className="mr-2 mt-1 text-white" size={12} />
                      Celestial event insights
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageCircle className="mr-3 text-white" />
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                    <Star
                      className="mx-auto mb-4 text-green-400 animate-pulse"
                      size={48}
                    />
                    <h3 className="text-xl font-semibold text-green-400 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-300">
                      Your email client should open shortly. The stars have
                      aligned!
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      <User className="inline mr-2" size={16} />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      <Mail className="inline mr-2" size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      <Star className="inline mr-2" size={16} />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                      placeholder="What brings you to the stars?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      <MessageCircle className="inline mr-2" size={16} />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Share your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} />
                    <span>Send Message to the Cosmos</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center space-x-4 opacity-30">
              {[...Array(7)].map((_, i) => (
                <Star
                  key={i}
                  className="animate-pulse text-white"
                  size={12}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologyContactPage;
