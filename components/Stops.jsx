import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

const Stops = ({stops, isLoading}) => {
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center">
          <svg className="w-38 h-38 md:w-44 md:h-44 max-sm:w-36 drop-shadow-xl" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" className="fill-blue-100" />
            <path 
              d="M60,100 Q100,40 140,100 T60,100" 
              className="stroke-purple-500 stroke-[4] fill-none animate-pulse"
            />
            <circle cx="60" cy="100" r="8" className="fill-blue-500" />
            <circle cx="140" cy="100" r="8" className="fill-purple-500" />
            <rect x="70" y="85" width="60" height="30" rx="15" className="fill-indigo-500" />
            <circle cx="85" cy="100" r="5" className="fill-white" />
            <circle cx="115" cy="100" r="5" className="fill-white" />
            <text 
              x="100" 
              y="150" 
              textAnchor="middle" 
              className="fill-blue-600 text-lg font-bold tracking-wider"
              style={{ fontSize: '18px', fontFamily: 'Arial, sans-serif' }}
            >
              CityHopper
            </text>
          </svg>
        </div>
        <h2 className="text-3xl max-sm:text-xl max-sm:my-4 text-center font-black mb-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          Discover Transit Stops Near You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stops && stops.map((stop) => (
            <div
              key={stop.key}
              className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Link href={`/schedules/${stop.number}`}>
              <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-md">
                    Stop #{stop.number}
                  </span>
                  <div className="text-xs font-semibold text-gray-500">
                    {Math.round(stop.distances.direct)}m away
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {stop.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Direction: {stop.direction}
                  </span>
                  <svg 
                    className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Stops