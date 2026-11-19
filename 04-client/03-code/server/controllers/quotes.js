import express from "express";

const router = express.Router();

const quotes = [
  { id: 1, likes: 0, text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { id: 2, likes: 0, text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { id: 3, likes: 0, text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
];

router.get("/", (req, res) => {
  setTimeout(() => {res.json({quotes})}, 1500);
});

 router.post("/:id/likes", (req, res) => {
   const id = Number(req.params.id);
   const quote = quotes.find((q) => q.id === id);
   if (!quote)
       return res.status(404).json({ error: "Quote not found" });
   quote.likes += 1;
   res.json({ quote });
 });

export default router;
