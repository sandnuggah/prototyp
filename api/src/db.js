const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: '/tmp/database.sqlite'
  // storage: ':memory:'
})

class Upload extends Sequelize.Model {}

Upload.init(
  {
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extension: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    uploadedBy: {
      type: Sequelize.STRING
    },
    storagePath: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'upload'
  }
)

Upload.sync()

module.exports = {
  sequelize,
  models: {
    Upload
  }
}
