const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note.js');
const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

router.post('/', authenticate, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.create({ title, content, userId: req.userId });
        res.status(201).json(note);
    } catch {
        res.status(400).json({ error: 'Failed to add note' });
    }
});

router.get('/', authenticate, async (req, res) => {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
});

router.put('/:id', authenticate, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        res.json(note);
    } catch {
        res.status(400).json({ error: 'Failed to update note' });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch {
        res.status(400).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;
