require('dotenv').config()

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const axios = require('axios')
const FormData = require('form-data')

const app = express()

app.use(cors())

const upload = multer()

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const data = new FormData()

    data.append('file', req.file.buffer, req.file.originalname)

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...data.getHeaders()
        }
      }
    )

    res.json(response.data)
  } catch (e) {
    console.error(e)

    res.status(500).json({
      error: 'Upload failed'
    })
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running')
})
