import { useEffect, useRef, useState } from "react";

export function useTimer(timer: number) {
  const [seconds, setSeconds] = useState(timer);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    clear();
    setIsActive(true);
    setSeconds(timer);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clear();
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    start();
    return () => clear();
  }, [timer]);

  return { seconds, isActive, trigger: start };
}
