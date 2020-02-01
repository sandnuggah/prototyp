const pkg = require('../package.json')
const config = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mime = require('mime')
const uuidv4 = require('uuid/v4')

const {
  models: { Upload }
} = require('./db')

const app = express()

app.use([bodyParser.json(), fileUpload()])

app.get('/', (_, res) => {
  return res.send(`API V${pkg.version}`)
})

app.get('/uploads', async (_, res, next) => {
  try {
    const uploads = await Upload.findAndCountAll({
      where: {},
      order: [['updatedAt', 'DESC']],
      limit: 5,
      offset: 0
    })

    return res.send(uploads)
  } catch (error) {
    next(error)
  }
})

app.get('/uploads/:pk', async (req, res, next) => {
  try {
    const { filename, extension, storagePath } = await Upload.findByPk(
      req.params.pk
    )

    res.set(
      'Content-Disposition',
      `attachment; filename=${filename + extension}`
    )

    return res.sendFile(storagePath)
  } catch (error) {
    next(error)
  }
})

app.post('/uploads', async (req, res, next) => {
  const isAllowedMimeType = config.ALLOWED_MIMETYPES.includes(
    req.files.file.mimetype
  )

  if (!isAllowedMimeType) {
    return res.status(400).send({
      message: 'Mimetype not allowed'
    })
  }

  const extension = mime.getExtension(req.files.file.mimetype)

  const storagePath = `${config.SPOOL_DIR + uuidv4()}.${extension}`

  req.files.file.mv(storagePath, async error => {
    if (error) {
      return next(error)
    }

    const { filename, description, uploadedBy } = req.body

    try {
      const upload = await Upload.create({
        filename,
        extension,
        description,
        uploadedBy,
        storagePath
      })

      return res.send(upload)
    } catch (error) {
      next(error)
    }
  })
})

app.patch('/uploads/:pk', async (req, res, next) => {
  try {
    const updatedUpload = await Upload.findByPk(req.params.pk).update(
      req.body,
      {
        fields: ['filename']
      }
    )

    return res.send(updatedUpload)
  } catch (error) {
    next(error)
  }
})

app.delete('/uploads/:pk', async (req, res, next) => {
  try {
    const upload = await Upload.findByPk(req.params.pk)
    upload.destroy()
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
})

app.listen(config.PORT, () => {
  console.log(`API V${pkg.version} listening on ${config.PORT}`)
})
