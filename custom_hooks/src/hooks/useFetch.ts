import { useEffect, useState } from "react";

export const useFetch = (url: string, retryTime: number) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  useEffect(() => {
    const timer = setInterval(getData, retryTime * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    data,
    loading,
  };
};
