
const { errorHandler } = require('./middleware/errorHandler')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const Controller = require('./Controllers/controller')

const multer = require('multer');

// Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const cors = require('cors')
const { authentication } = require('./middleware/authentication')

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/subscribe', Controller.subscribe);
app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.post('/forget', Controller.forgetPassword)
app.get('/profile', authentication, Controller.getProfile)
app.get('/users', authentication, Controller.getUsers)
app.delete('/user/:id', Controller.deleteUserById)

app.get('/portfolio', Controller.getPortfolios)

app.get('/services', Controller.getServices)

app.get('/trainingEvents', Controller.getTrainingEvents)
app.post('/trainingEvents/add', upload.single('link_gambar'), Controller.addTrainingEvents)
app.delete('/trainingEvents/:id', Controller.deleteTrainingEvents)

app.get('/listPeserta', authentication, Controller.getListPeserta)
app.post('/listPeserta/add', authentication, upload.fields([
    { name: 'form_pp', maxCount: 1 },
    { name: 'Ktp', maxCount: 1 },
    { name: 'Ijazah', maxCount: 1 },
    { name: 'pas_foto', maxCount: 1 },
    { name: 'sk', maxCount: 1 },
    { name: 'foto_kegiatan', maxCount: 1 }
]), Controller.addListPeserta);
app.delete('/listPeserta/:id', authentication, Controller.deleteListPeserta)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
