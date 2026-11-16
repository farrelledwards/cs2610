import express from "express";

const router = express.Router();

const quotes = [
  { id: 1, text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { id: 2, text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { id: 3, text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
];

router.get("/", (req, res) => {
  res.json({quotes});
});

export default router;
