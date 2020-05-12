const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const notes = require("./db/db.json");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.port || 3000;

//-----------------------------------------------------------------------------

function getNotes() {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        return data;
    });
}

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

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    
    notes.push(newNote);

    fs.writeFile("./db/db.json", notes, (err) => {
        if (err) throw err;
    });

    return res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//-----------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
