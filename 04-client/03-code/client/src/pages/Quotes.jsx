import { useState, useEffect } from "react";
import { useQuotes } from "../hooks/useQuotes.js"
import QuoteCard from "../components/QuoteCard.jsx";

export function Quotes() {
  const quotes = useQuotes();

  return (
    <div>
      <h2>Quotes</h2>
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} text={quote.text} author={quote.author} />
      ))}
    </div>
  );
}
