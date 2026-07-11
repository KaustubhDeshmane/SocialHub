let express = require("express");
let cors = require("cors");
let { MongoClient, ObjectId } = require("mongodb"); 
let multer = require("multer");
let path = require("path");
let fs = require("fs");

let app = express();
let url = "mongodb://0.0.0.0:27017";


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
let recep = multer({ storage });

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


app.post("/upload", recep.single("file"), async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        let db = client.db("tinder");
        let collec = db.collection("photos");

        let obj = {
            username: req.body.username,
            caption: req.body.caption,
            file_name: req.file.filename,
            file_url: `http://localhost:3000/uploads/${req.file.filename}`,
            upload_time: new Date()
        };

        let result = await collec.insertOne(obj);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    } finally {
        await client.close();
    }
});

app.get("/files",
    (req, res) => {
        let client = new MongoClient(url);
        client.connect();
        let db= client.db("tinder");
        let collec = db.collection("photos");

        let username = req.query.username;
        obj = username ? { username } : {};
        collec.find(obj).toArray()
        .then((result) => res.send(result))
        .catch((error)=>res.send(error));
    }
);

app.delete("/delete/:id", (req, res) => {
    let client =new MongoClient(url);
    client.connect();
    let db=client.db("tinder");
    let collec = db.collection("photos");
    let id = req.params.id;
    let _id = new ObjectId(id);

    collec.findOne({ _id })
    .then((obj)=>{
        fs.promises.unlink(`uploads/${obj.file_name}`)
        return collec.deleteOne({ _id });
    }
)
.then((result)=>res.send(result))
.catch((error)=>res.send(error));

    });

app.listen(5000, () => {
    console.log("Express server running ");
});