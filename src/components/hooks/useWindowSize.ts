import { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({
    winW: 0,
    winH: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSize({
      winW: window.innerWidth,
      winH: window.innerHeight,
    });

    function handleResize() {
      setSize({
        winW: window.innerWidth,
        winH: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...size, isClient };
} 