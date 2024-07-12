import { useState, useEffect, useCallback } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/messages/gen-token", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      } else {
        setError("Failed to fetch token");
      }
    } catch (err) {
      setError("An error occurred while fetching the token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getToken();
  },[getToken]);

  return { loading, error, token };
};
