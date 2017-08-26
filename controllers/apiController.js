const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
router.use(bodyParser.json());
router.get('/students', (req, res) => {
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find({});
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});


router.get('/posts', (req, res) => {
    const mongoConnection = 'mongodb://localhost:27017/test';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});



router.get('/students/:id', (req, res) => {
    const mongoConnection = 'mongodb://localhost:27017/profile';
    const studentId = req.params.id
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(studentId);
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/posts', (req, res, next) => {
    const filePath = __dirname + '/../data/posts.json';
    const callbackFunction = function(error, file) {
        if(error) {
            return next(error);
        }
        // we call .toString() to turn the file buffer to a String
        const fileData = file.toString();
        // we use JSON.parse to get an object out the String
        const postsJson = JSON.parse(fileData);
        res.json(postsJson);
    };
    fs.readFile(filePath, callbackFunction);
});

router.post('/posts', (req, res) => {
    console.log(req.body);
    res.status(500).send('not implemented');
});

module.exports = router;