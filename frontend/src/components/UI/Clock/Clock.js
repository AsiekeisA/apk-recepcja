import {useRef, useEffect, useState} from "react"

const useCurrentCallback = (callback) => {
    const reference = useRef();
    reference.current = callback;
    return (...args) => {
      return reference.current?.(...args);
    };
  };
  
  export default function Clock () {
    const [time, setTime] = useState('');
    const currentCallback = useCurrentCallback(() => {
      const date = new Date();
      setTime(date.toLocaleString())
    });
    useEffect(() => {
      const handle = setInterval(currentCallback, 1000);
      return () => clearInterval(handle);
    }, []);
    return (
      <div>{time}</div>
    );
  };
  