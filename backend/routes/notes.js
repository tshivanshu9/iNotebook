const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

/**
 * @GET_ALL_NOTES_FOR_LOGGED_IN_USER
 */
router.get('/', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

/**
 * @SAVE_A_NOTE_FOR_LOGGED_IN_USER
 */
router.post('/', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
    body('tag').optional().isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        const note = await Notes.create({
            title,
            description,
            tag,
            userId: req.user.id
        });
        res.json(note);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

/**
 * @UPDATE_A_NOTE_FOR_LOGGED_IN_USER
 */
router.put('/:id', fetchuser, [
    body('title').optional().isLength({ min: 3 }),
    body('description').optional().isLength({ min: 5 }),
    body('tag').optional().isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found");
        }
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

/**
 * @DELETE_A_NOTE_FOR_LOGGED_IN_USER
 */
router.delete('/:id', fetchuser, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note || note.userId.toString() !== req.user.id) {
            return res.status(400).send("Not Found");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted"});
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;