import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Prev from "./components/Prev";

function App() {
  const [currentpost, Setcurrentpost] = useState(1);
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/" + currentpost,
    10,
  );

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <button onClick={() => Setcurrentpost(1)}>1</button>
      <button onClick={() => Setcurrentpost(2)}>2</button>
      <button onClick={() => Setcurrentpost(3)}>3</button>
      <div>{JSON.stringify(data)}</div>

      <Prev />
    </>
  );
}

export default App;
