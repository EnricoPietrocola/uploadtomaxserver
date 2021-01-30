const path = require('path')
const express = require('express')
const fs = require('fs')
const http = require('http')
const app = express()
const multer = require('multer')
const Max = require('max-api')

const PORT = process.env.PORT || 80
const uploadsDirectoryPath = path.join(__dirname, '../code/uploads')
const publicDirectoryPath = path.join(__dirname, '../code/public')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../code/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    //limits: { fileSize: 10485760 },
    fileFilter: function(req, file, cb) {
        const filetypes = /wav|WAV|flac|FLAC|mpeg|MPEG|aif|AIF/;
        //const filetypes = /pdf|PDF/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
})

app.post('/upload', upload.single('sound'), function(req, res, next) {
    //get new uploaded file, move it in proper room folder path
    const originalName = req.file.originalname
    //console.log('POST ROOM IS ' + req.query.roomname)
    //Max.post(uploadsDirectoryPath + '/' + originalName);

    try {
        Max.outlet(path.normalize(path.join(uploadsDirectoryPath, originalName)).toString())
        return res.status(201).send("File Inviato Correttamente")
    } catch (error) {
        console.error(error);
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
})

httpServer = http.createServer(app);
httpServer.listen(PORT)
console.log('Server started')