import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await axios(url);
        setData(res.data)
        setLoading(false)
      } catch (err) {
        setLoading(true)
        setErr(err);
        setLoading(false)
      }
    };
    fetch()
  },[]);
  return {data,loading,err}
};

export default useFetch