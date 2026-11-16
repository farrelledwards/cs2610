import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard.jsx";

export function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes));
  }, []);

  return (
    <div>
      <h2>Quotes</h2>
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} text={quote.text} author={quote.author} />
      ))}
    </div>
  );
}
