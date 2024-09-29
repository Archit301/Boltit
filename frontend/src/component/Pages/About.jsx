import React from 'react';
import { 
  LightBulbIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

function About() {
  return (
    <div className="flex justify-center bg-slate-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="mt-2 text-lg">
            Hello! I'm a college student passionate about technology and development. I'm dedicated to learning and growing in the field of software development, with a focus on creating innovative and impactful solutions.
          </p>
        </div>

        {/* Avatar Section */}
        {/* <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
            src="https://via.placeholder.com/150" // Replace with your profile image URL
            alt="Profile"
          />
        </div> */}

        {/* Content Sections */}
        <div className="p-6 space-y-6">
          {/* Mission */}
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
              <LightBulbIcon className="h-6 w-6 text-blue-600 mr-2" />
              My Mission
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              My mission is to continuously enhance my skills and contribute to exciting projects. I aim to create meaningful software solutions that address real-world problems and make a positive impact.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
              <AcademicCapIcon className="h-6 w-6 text-blue-600 mr-2" />
              My Journey
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              Starting my journey in software development, I've worked on various projects, both academic and personal. My experiences have taught me valuable lessons and inspired me to pursue a career in tech with enthusiasm and determination.
            </p>
          </div>

          {/* Skills & Interests */}
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
              <CogIcon className="h-6 w-6 text-blue-600 mr-2" />
              Skills & Interests
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              I have a keen interest in web development, particularly in technologies like React.js and CodeIgniter. I'm also passionate about exploring new tools and methodologies that help in building efficient and user-friendly applications.
            </p>
            {/* Skills List */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React.js</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">CodeIgniter</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Git</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">HTML5</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">CSS3</span>
              {/* Add more skills as needed */}
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
              <ChatBubbleLeftIcon className="h-6 w-6 text-blue-600 mr-2" />
              Get in Touch
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              I'm always open to connecting with like-minded individuals and professionals. Feel free to email me for collaborations, questions, or just to connect!
            </p>
            <a 
              href="mailto:tambiarchit@gmail.com" // Replace with your email
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
