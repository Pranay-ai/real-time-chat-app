import { useState, useEffect } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (customUrl = url, customOptions = options) => {
    setLoading(true);
    setError(null);

    try {
      const { body, headers, ...restOptions } = customOptions;

      // If body is FormData, don't stringify it and remove Content-Type (fetch will set it)
      const isFormData = body instanceof FormData;
      const requestOptions = {
        ...restOptions,
        body: isFormData ? body : JSON.stringify(body),
        headers: isFormData
          ? { ...headers } // Do not set Content-Type, fetch sets it automatically
          : { "Content-Type": "application/json", ...headers },
      };

      const response = await fetch(customUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]); // Refetch when URL changes

  return { data, loading, error, refetch: fetchData };
}
