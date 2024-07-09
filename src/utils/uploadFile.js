const multer = require('multer')
const fs = require('fs')
const ApiError = require('./ApiError')
const httpStatus = require('http-status')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/avatar'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName=`${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new ApiError(httpStatus.BAD_REQUEST, 'Only images are allowed'))
    }
    cb(null, true)
  }
})

module.exports = uploadFile
