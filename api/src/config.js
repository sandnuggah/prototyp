module.exports = {
  SPOOL_DIR: process.env.SPOOL_DIR || '/tmp/',
  PORT: process.env.PORT || 3001,
  ALLOWED_MIMETYPES: ['image/jpeg', 'application/pdf', 'text/xml']
}
