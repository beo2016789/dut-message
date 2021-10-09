const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect(process.env.DB)
        .then(() => console.log('Connect success'))
        .catch(err => console.log('Connect error' + err))
}

module.exports = {connect}