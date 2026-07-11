let express = require("express");
let cloudinary = require("cloudinary").v2;
let { CloudinaryStorage } = require("multer-storage-cloudinary");
let cors = require("cors");
let { MongoClient, ObjectId } = require("mongodb");
let multer = require("multer");

let app = express();

const url = 'mongodb+srv://ashish03:ASH030406@cluster3.ybezyga.mongodb.net/tinder?retryWrites=true&w=majority&appName=Cluster3';

app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dfcxqt77m',
    api_key: '423779838426499',
    api_secret: 'mdEUs9krWmfYBDc55rp_Ad7P1r8'
});

let storage = new CloudinaryStorage({ cloudinary });
let recep = multer({ storage });

app.use('/uploads', express.static('uploads'));

// Upload endpoint
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
            file_url: req.file.path,
            upload_time: new Date(),
            likes: [] // initialize likes as empty array
        };

        let result = await collec.insertOne(obj);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    } finally {
        await client.close();
    }
});

// Get all files
app.get("/files", (req, res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("tinder");
    let collec = db.collection("photos");

    let username = req.query.username;
    let obj = username ? { username } : {};
    collec.find(obj).toArray()
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
});

// Delete file and remove from Cloudinary
app.delete("/delete/:id", (req, res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("tinder");
    let collec = db.collection("photos");
    let _id = new ObjectId(req.params.id);

    collec.findOne({ _id })
        .then((obj) => {
            cloudinary.uploader.destroy(obj.file_name);
            return collec.deleteOne({ _id });
        })
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
});

// Like toggle route
app.post("/toggle-like/:id", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db("tinder");
        const collec = db.collection("photos");
        const _id = new ObjectId(req.params.id);
        const { username } = req.body;

        const post = await collec.findOne({ _id });
        if (!post) return res.status(404).send({ error: "Post not found" });

        const alreadyLiked = post.likes.includes(username);
        const update = alreadyLiked
            ? { $pull: { likes: username } }
            : { $addToSet: { likes: username } };

        await collec.updateOne({ _id }, update);
        res.send({ liked: !alreadyLiked });
    } catch (error) {
        res.status(500).send({ error: error.message });
    } finally {
        await client.close();
    }
});

app.listen(5000, () => {
    console.log("Express server running");
});
