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
 * @SAVE_A_NOTE
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
module.exports = router;