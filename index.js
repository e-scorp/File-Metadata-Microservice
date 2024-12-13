import express from 'express';
import cors from 'cors';
import multer from 'multer';
import "dotenv/config.js"

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//set up file upload using Multer
const upload = multer({ dest: 'uploads/' })

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//api to handle file uploads and return metadata

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" })
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
