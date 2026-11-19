import {useState} from "react";

function QuoteCard({ id, text, author, likes: initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);

    async function handleLikes() {
       const res = await fetch(`/api/quotes/${id}/likes`, { method: "POST" });
       const data = await res.json();
       setLikes(data.quote.likes);
    }
  return (
    <div className="quote-card">
      <p className="quote-text">“{text}”</p>
      <p className="quote-author">— {author}</p>
        <button className="btn btn-primary" onClick={handleLike}>
            Likes {likes}
        </button>
    </div>
  );
}

export default QuoteCard;
