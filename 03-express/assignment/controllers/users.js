import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Get users profile ${userId}` });
});

export default router;
