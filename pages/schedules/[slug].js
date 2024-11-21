import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Page = () => {
    const [route, setRoute] = useState(0);
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const router = useRouter();
    const { slug } = router.query;

    console.log(schedules);
    

    useEffect(() => {
        if (slug) {
            const intRoute = parseInt(slug);
            setRoute(intRoute);
        }
    }, [slug]);

    useEffect(() => {
        if (route) {
            getSchedules(route);
        }
    }, [route]);
    
    async function getSchedules(route) {
        const API_KEY = "47UyTmxpBqyLKUzxmyyG";
        setIsLoading(true);
        
        try {
            if (!route) {
                console.log("No route specified");
                return;
            }
      
            const response = await fetch(
                `https://api.winnipegtransit.com/v3/stops/${route}/schedule.json?api-key=${API_KEY}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSchedules(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            setIsLoading(false);
        }
    }

        return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                <div>
                    <button 
                        onClick={() => router.back()} 
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Stops
                    </button>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stop Information */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {schedules['stop-schedule'].stop.name}
                        </h1>
                        <p className="text-gray-600">
                            Stop #{schedules['stop-schedule'].stop.number} • {schedules['stop-schedule'].stop.direction}
                        </p>
                    </div>
    
                    {/* Route Schedules */}
                    <div className="space-y-6">
                        {schedules['stop-schedule']['route-schedules'].map((routeSchedule, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-lg">
                                            {routeSchedule.route['badge-label']}
                                        </span>
                                        <h2 className="text-white font-semibold text-xl">
                                            {routeSchedule.route.name}
                                        </h2>
                                    </div>
                                </div>
    
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {routeSchedule['scheduled-stops'].map((stop, stopIndex) => {
                                            const estimatedTime = new Date(stop.times.departure.estimated);
                                            const now = new Date();
                                            const minutesUntilArrival = Math.round((estimatedTime - now) / 60000);
    
                                            return (
                                                <div key={stop.key} 
                                                    className="flex md:flex-row md:items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="flex-1 space-y-3">
                                                        <div className="text-lg font-semibold  text-blue-600">
                                                            {stop.variant.name}
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="mt-4 md:mt-0 text-right">
                                                        <div className="text-3xl font-bold text-purple-600">
                                                            {minutesUntilArrival} min
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            until arrival
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </>
            )}
        </div>
    );
}

export default Page;
