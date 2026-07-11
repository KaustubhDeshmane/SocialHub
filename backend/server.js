let express= require("express");
let cors = require("cors");
let {MongoClient, ObjectId}=require("mongodb");
let multer= require("multer");

let cloudinary =require("cloudinary").v2;
let {CloudinaryStorage} = require("multer-storage-cloudinary");

require("dotenv").config();

let app=express();
app.use(cors());
app.use(express.json());
// app.use('/uploads',express.static('uploads'));

const url = process.env.MONGO_URI;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  let storage= new CloudinaryStorage({cloudinary});
  let recep = multer({storage});

app.post("/upload", recep.single("file"), 
    async (req, res) => {
    let client = new MongoClient(url);
    await client.connect();
        let db = client.db("tinder");
        let collec = db.collection("photos");
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }

        if (!req.body.username) {
            return res.status(400).json({
                success: false,
                message: "Username is required."
            });
        }
        let obj = {
            username: req.body.username,
            caption: req.body.caption,
            file_name: req.file.filename,
            file_url: req.file.path,
            upload_time: new Date()
        };
        collec.insertOne(obj)
            .then(async (result) => {
                await client.close();
                res.status(201).json({
                    success: true,
                    message: "Photo uploaded successfully",
                    data: result
                });
            })
            .catch(async (error) => {
                await client.close();
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            })
    });

    app.get("/files", 
        async (req, res) => {
        let client = new MongoClient(url);
        await client.connect();
            let db = client.db("tinder");
            let collec = db.collection("photos");
            let username = req.query.username;
            let command = username ? { username } : {};
            collec.find(command).toArray()
                .then(async (result) => {
                    await client.close();
                    res.json(result);
                })
                .catch(async (error) => {
                    await client.close();
                    res.status(500).json({
                        success: false,
                        message: error.message
                    });
                });
    });

    
        app.delete ("/delete/:id",
            async (req,res)=>{
            let client = new MongoClient(url);
            await client.connect();
            let db = client.db("tinder") ;
        
            let collec = db. collection("photos");
        
            let id = req.params.id;
        
            let _id = new ObjectId(id);
        
             collec.findOne({_id})
                .then(async (obj)=>{

                    if (!obj) {
                        return res.status(404).json({
                            success: false,
                            message: "Photo not found."
                        });
                    }

                    await cloudinary.uploader.destroy(obj.file_name);
                    return collec.deleteOne({_id})
                })
                .then(async (result) => {
                    await client.close();

                    res.json({
                        success: true,
                        message: "Photo deleted successfully"
                    });
                })
                .catch(async (error) => {
                    await client.close();

                    res.status(500).json({
                        success: false,
                        message: error.message
                    });
                });
            }
        
        )

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "InstaVibe Backend API is running 🚀"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});