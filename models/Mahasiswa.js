const mongoose = require('mongoose')

const MahasiswaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  npm: {
    type: Number,
    required: true,
    unique: true
  },
  alamat: {
    provinsi: String,
    kota: String,
    jalan: String
  },
  hobi: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Mahasiswa',MahasiswaSchema);