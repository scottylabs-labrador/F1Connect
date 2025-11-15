"use client"

import React, { useState } from 'react';

interface Video {
  id: string;
  title: string;
  embedUrl: string;
  description: string;
}

export default function VideoGallery() {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'An amazing video showcasing awesome content'
    },
    {
      id: '2',
      title: 'Sample Video 2',
      embedUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      description: 'Another fantastic video you should watch'
    },
    {
      id: '3',
      title: 'Sample Video 3',
      embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      description: 'More incredible content for your viewing'
    },
    {
      id: '4',
      title: 'Sample Video 4',
      embedUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
      description: 'Engaging video content continues here'
    },
    {
      id: '5',
      title: 'Sample Video 5',
      embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
      description: 'Even more amazing videos to explore'
    },
    {
      id: '6',
      title: 'Sample Video 6',
      embedUrl: 'https://www.youtube.com/embed/ZZ5LpwO-An4',
      description: 'The collection keeps getting better'
    }
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Video Gallery
          </h1>
          <p className="text-gray-400 mt-2 text-center">Here is a collection of videos to help you.</p>
        </div>
      </header>

      {/* Video Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-gray-950">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500">
          <p>© 2024 Video Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}