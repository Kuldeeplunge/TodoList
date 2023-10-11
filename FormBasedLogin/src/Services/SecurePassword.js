const bcrypt = require('bcryptjs')

const HashPassword = async (password) => {

  const passwordhash = await bcrypt.hash(password, 10)

  return passwordhash;
}

const CheckPassword = (password, hash) => {
  const isAuthenticate = bcrypt.compare(password, hash)
  return isAuthenticate;
}

module.exports = { HashPassword, CheckPassword }