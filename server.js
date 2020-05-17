const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//-----------------------------------------------------------------------------

function readNotes() {
    return JSON.parse(fs.readFileSync("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        return data;
    }));
}

function writeNotes(notes) {
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
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
    return res.json(readNotes());
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    
    const notes = readNotes();

    notes.push(newNote);

    let id = 1;
    notes.map(note => note.id = id++);

    writeNotes(notes);

    return res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;

    const notes = readNotes().filter(note => note.id != noteId);

    writeNotes(notes);

    return res.json(notes);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//-----------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
