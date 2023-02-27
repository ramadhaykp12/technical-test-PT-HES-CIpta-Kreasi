const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/Mahasiswa');

// Menampilkan semua data mahasiswa yang tersedia dalam database
router.get('/', async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    res.status(200).json(mahasiswa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menampilkan data satu mahasiswa berdasarkan NPM mahasiswa
router.get('/:npm', getMahasiswaByNpm, (req, res) => {
  res.status(200).json(res.mahasiswa);
});

// Menambahkan data baru mahasiswa  
router.post('/add', async (req, res) => {
  const mahasiswa = new Mahasiswa({
    nama: req.body.nama,
    npm: req.body.npm,
    alamat: req.body.alamat,
    hobi: req.body.hobi
  });

  try {
  	const existingMahasiswa = await Mahasiswa.findOne({ npm: req.params.npm });
    if (existingMahasiswa) {
      return res.status(409).json({ error: 'Data mahasiswa sudah ada' });
    }
    const newMahasiswa = await mahasiswa.save();
    res.status(201).json(newMahasiswa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Melakukan update atau memperbarui data mahasiswa yang sudah ada
router.put('/:npm', getMahasiswaByNpm, async (req, res) => {
  if (req.body.nama != null) {
    res.mahasiswa.nama = req.body.nama;
  }

  if (req.body.alamat != null) {
    res.mahasiswa.alamat = req.body.alamat;
  }

  if (req.body.hobi != null) {
    res.mahasiswa.hobi = req.body.hobi;
  }

  try {
    const updatedMahasiswa = await res.mahasiswa.save();
    res.status(200).json(updatedMahasiswa);
    res.json({ message: 'Data mahasiswa berhasil diperbarui' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Menghapus satu data mahasiswa berdasarkan NPM yang dicari
router.delete('/:npm', getMahasiswaByNpm, async (req, res) => {
  try {
    await res.mahasiswa.remove();
    res.json({ message: 'Data mahasiswa berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware function to get a mahasiswa by npm
async function getMahasiswaByNpm(req, res, next) {
  let mahasiswa;
  try {
    mahasiswa = await Mahasiswa.findOne({ npm: req.params.npm });
    if (mahasiswa == null) {
      return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mahasiswa = mahasiswa;
  next();
}

module.exports = router;