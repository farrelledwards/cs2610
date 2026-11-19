import { useState, useEffect } from "react";


export function useQuotes() {
    const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes));
  }, []);

  return quotes;
}