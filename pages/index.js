import Stops from "@/components/Stops";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [locations, setLocations] = useState([]);
  const [stops, setStops] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  console.log(locations);
  console.log(schedules);
  

  console.log(x);
  console.log(y);

  console.log(stops);

  useEffect(() => {
    
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [latitude, longitude]);

  async function getLocations() {
    const API_KEY = "47UyTmxpBqyLKUzxmyyG";

    try {
      if (!latitude || !longitude) {
        console.log("Waiting for coordinates...");
        return;
      }
      const response = await fetch(
        `https://api.winnipegtransit.com/v3/locations.json?` +
          `api-key=${API_KEY}&` +
          `lat=${latitude}&` +
          `lon=${longitude}&` +
          `distance=250`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLocations(data.locations);
      setX(data.locations[0].centre.utm.x);
      setY(data.locations[0].centre.utm.y);
      
      return data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return null;
    }
  }

  async function getStops() {
    const API_KEY = "47UyTmxpBqyLKUzxmyyG";

    try {
      if (!latitude || !longitude) {
        console.log("Waiting for coordinates...");
        return;
      }
      

      const response = await fetch(
        `https://api.winnipegtransit.com/v3/stops.json?` +
          `api-key=${API_KEY}&` +
          `lat=${latitude}&` +
          `lon=${longitude}&` +
          `distance=500`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStops(data.stops); // Update state with stops data
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching stops:", error);
      return null;
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      getLocations();
    }
  }, [latitude, longitude]);
  
  useEffect(() => {
    if (latitude && longitude) {
      getStops();
    }
  }, [latitude, longitude]);

  


  return (
    <>
    {isLoading && <div>
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black">
                {/* <div className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-black opacity-75"></div> */}
            </div>
        </div>
    </div>}
      <Stops stops={stops} />
    </>
  );
}

