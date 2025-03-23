import { useEffect, useRef } from "react";

export const usePrev = (value: number) => {
  const ref = useRef(value);
  console.log(ref);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

//it returns first, effect gets called later
//https://giacomocerquone.com/blog/life-death-useprevious-hook/
