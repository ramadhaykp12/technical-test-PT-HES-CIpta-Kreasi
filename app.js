const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')

app.use(bodyParser())
const mahasiswaRoutes = require('./routes/mahasiswa')

app.use('/mahasiswa', mahasiswaRoutes)


// Koneksi Mongodb
db.on('error', console.error.bind(console,'Database tidak terhubung'))
db.once('open',() => {
  console.log('Database terhubung')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})