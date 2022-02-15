const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const item = require('./models/item');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

dotenv.config()

mongoose.connect((process.env.MONGO_URL), { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log("connected to mongo db!") });

const app = express();
const port = 5000;

//middlewares

//CORS Bitch
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.get('/', async (req, res) => {
    const results = await item.find();
    res.json(results)
});

app.post('/', upload.array('uploaded pics', 30), async (req, res) => {
    try {
        for (let i = 0; i < req.files.length; i++) {

            const newitem = new item({
                pic: req.files[i].path,
                tag: req.files[i].originalname,
            })

            await newitem.save();
        }
        res.send("Things are added");
    }
    catch (err) {
        console.log(err)
    }
});

app.put('/', async (req, res) => {
    try {
        await item.updateOne({ _id: req.body._id }, { $set: { tag: req.body.tag, disc: req.body.disc } })
        res.send("updated it")
    }
    catch (err) {
        console.log(err)
    }
})

app.delete('/', async (req, res) => {
    try {
        await item.deleteOne({ _id: req.body._id })
        res.send("deleted " + req.body._id)
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});