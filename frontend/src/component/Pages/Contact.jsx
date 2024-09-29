import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add logic to send form data to your backend or email service
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Optionally, display a success message to the user
    alert('Your message has been sent successfully!');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg">
            If you have any questions, feedback, or just want to say hello, I'd love to hear from you. Please use the form below to get in touch or reach out via email.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
                <a href="mailto:tambiarchit@gmail.com" className="text-blue-500 hover:underline">tambiarchit@gmail.com</a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <PhoneIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Phone</h2>
                <span className="text-gray-700">+123-456-7890</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
                <span className="text-gray-700">123 Main Street, City, Country</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Follow Me</h2>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/yourprofile" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourprofile" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://github.com/yourprofile" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-800 hover:text-black transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="you@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Subject"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
