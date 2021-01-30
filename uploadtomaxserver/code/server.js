const path = require('path')
const express = require('express')
const fs = require('fs')
const http = require('http')
const app = express()
const multer = require('multer')

const PORT = process.env.PORT || 80
const uploadsDirectoryPath = path.join(__dirname, '../uploads')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10485760 },
    fileFilter: function(req, file, cb) {

        //const filetypes = /pdf|PDF/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
})

app.post('/pdfupload', upload.single('docUpload'), function(req, res, next) {
    //get new uploaded file, move it in proper room folder path
    const originalName = req.file.originalname
    const documentUrl = domain + '/uploads/' + req.file.originalname
    const roomNameReq = req.query.roomname
    const socketID = req.query.socket
    //console.log('POST ROOM IS ' + req.query.roomname)

    console.log('Request sent by user socketID ' + socketID)
    try {
        fs.copyFile(uploadsDirectoryPath + '/' + originalName, uploadsDirectoryPath + '/' + roomNameReq + '/' + originalName.replace(/#/g,"_").replace(/ /g,"_"), (err) => {
            try{
                if (err) throw err;

                console.log('moved doc to room folder, deleting doc from temp folder')
                fs.unlinkSync(uploadsDirectoryPath + '/' + originalName)

                rooms.changeRoomDocURL(roomNameReq, documentUrl) //this line is repeated in case a file stayed on the server after a reboot

                //io.to(roomNameReq).emit('signalchannel', 'changeDocument,' + documentUrl)
                io.to(socketID).emit('datachannel', 'notifyDocLink,' + documentUrl)
                res.send(" ");
            }
            catch(e){
                console.log(e)
            }
        });
    }
    catch (e){
        console.log(e)
    }
})

app.get('/status', (req, res) => {
    res.send('Cid is running, with ' + rooms.rooms.length + ' open rooms, with ' + rooms.getConnectionsCount() + ' total users. Total connections since last reboot are ' + totalConnections)
})

httpServer = http.createServer(app);
httpServer.listen(PORT)
console.log('Server started')