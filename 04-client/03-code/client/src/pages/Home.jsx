import { useRequireUser } from "../hooks/useRequireUser";
import { useQuotes } from "../hooks/useQuotes.js"
import  QuoteCard from "../components/QuoteCard.jsx"
import logo from "../assets/logo.png";

function Home() {
  const user = useRequireUser();
  const quotes = useQuotes();

  if (!user) {
    return null;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user.username}!</h2>
        {quotes.length > 0 && (
            <QuoteCard text={quotes[0].text} author={quotes[0].author} />
        )}
      <img src={logo} alt="My App" className="home-logo" />
    </div>
  );
}

export default Home;
