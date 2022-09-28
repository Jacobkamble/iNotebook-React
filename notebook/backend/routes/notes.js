const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1:Get all the notes using GET api/notes/fetchallnotes Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 : Add a new Note using :POST /api/notes/addnote Login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 4 }),
        body("description", "Description must be atleast 5 characters").isLength({
            min: 5,

        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // if there are errors retur bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await notes.save();
            res.json(savedNote);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3 : Updating a Existing Note using :POST /api/notes/updatenote Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // Create a newNote Object
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        // Find the note to be updated and update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { res.status(404).send("Not Found") };

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json({ notes })
        // const notes= Notes.findByIdAndUpdate()
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : Deleting a Existing Note using :DELETE /api/notes/deletenote Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted and delete it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") };

        // Allow deletion only if user owns this note
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", notes: notes });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
