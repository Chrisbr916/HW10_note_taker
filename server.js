const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 3001;



app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
// redirects to notes 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
//sends notes to the browser  
app.get("/api/notes", (req, res) => {
    //console.log("this works");
   let notes =  fs.readFileSync(path.join(__dirname, "./db/db.json"))
   // this turns it into plan javascript 
   notes = JSON.parse(notes);
   //console.log(notes);
   res.json(notes);
});

app.post("/api/notes", (req, res) => {
    //console.log("this works");
   let notes =  fs.readFileSync(path.join(__dirname, "./db/db.json"))
   // this turns it into plan javascript 
   notes = JSON.parse(notes);
   req.body.id = req.body.title;
   notes.push(req.body);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
    notes = JSON.parse(notes);

   //console.log(notes);
   res.json(notes);
});

app.listen(PORT, () =>{
    console.log(`Express server is listening on http://localhost:${PORT}`)
}

);
