const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = require("./db/db.json")

const port = process.env.port || 3000;

//-----------------------------------------------------------------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    return res.json(notes);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.json(true);
});

app.delete("/api/notes/:id", (req, res) => {});

//-----------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
