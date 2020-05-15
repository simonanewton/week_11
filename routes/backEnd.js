function readNotes() {
    return fs.readFileSync("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        return JSON.parse(data);
    });
}

app.get("/notes", (req, res) => {
    return res.json(readNotes());
});

app.post("/notes", (req, res) => {
    const newNote = req.body;
    
    const notes = readNotes();

    // create note id

    notes.push(newNote);

    fs.writeFile("./db/db.json", notes, (err) => {
        if (err) throw err;
    });

    return res.json(newNote);
});

app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;

    const notes = readNotes().filter(note => {
        note.id != noteId;
    });

    fs.writeFile("./db/db.json", notes, (err) => {
        if (err) throw err;
    });
});
