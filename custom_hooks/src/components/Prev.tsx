import { useState } from "react";
import { usePrev } from "../hooks/usePrev";

const Prev = () => {
  const [state, setState] = useState(0);
  const prev = usePrev(state);

  return (
    <>
      <p>{state}</p>
      <button
        onClick={() => {
          setState((curr) => curr + 1);
        }}
      >
        Click me
      </button>
      <p>The previous value of the state was: {prev}</p>
    </>
  );
};

export default Prev;
