const mongoose = require('mongoose')
mongoose.set("strictQuery", false);+
mongoose.connect('mongodb://localhost:27017/mahasiswadb',{useNewURLParser: true,useUnifiedTopology:true})
let db = mongoose.connection
module.exports = db